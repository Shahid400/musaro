import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IUser, User, UserRepository } from '../user';
import { JwtService } from '@nestjs/jwt';
import { ResponseMessage } from '@shared/constants';
import { Hash, generateOtpWithExpiry } from '@shared/utils';
import { IOTP } from '@shared/interfaces';
import {
  IAuthService,
  IChangePassword,
  IForgotPassword,
  ILogin,
  IResetPassword,
  ISignup,
  IVerifyOtp,
  IVerifyToken,
} from './interfaces';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async checkUserName(payload: { username: string }) {
    try {
      let { username } = payload;
      const userNameExists = await this.userRepository.findOne(
        {
          username,
        },
        { username: 1 },
        { notFoundThrowError: false },
      );
      if (userNameExists)
        throw new ConflictException(ResponseMessage.USERNAME_ALREADY_EXISTS);

      return null;
    } catch (error) {
      throw error;
    }
  }

  async signup(payload: ISignup) {
    try {
      const { username, mobile, password } = payload;

      // Check if username or mobile already exists
      const existingUser = await this.userRepository.findOne(
        {
          $or: [{ username }, { mobile }],
        },
        { username: 1, mobile: 1 },
        { notFoundThrowError: false },
      );

      if (existingUser)
        throw new ConflictException(
          existingUser.username === username
            ? ResponseMessage.USERNAME_ALREADY_EXISTS
            : ResponseMessage.MOBILE_ALREADY_EXISTS,
        );

      // Hash password and generate OTP asynchronously in parallel
      const [hashedPassword, otp] = await Promise.all([
        Hash.make(password),
        generateOtpWithExpiry(),
      ]);

      // Create user
      const newUser = await this.userRepository.create({
        ...payload,
        username,
        password: hashedPassword,
        otp,
      });

      // Omit sensitive fields from response
      const { password: _, otp: __, ...response } = newUser;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async login(payload: ILogin) {
    try {
      const { username, password, role } = payload;
      const user = await this.userRepository.findOne(
        { username, role, isActive: true },
        { otp: 0 },
        { notFoundThrowError: false },
      );
      if (!user || !(await Hash.compare(password, user?.password))) {
        throw new BadRequestException(
          ResponseMessage.INVALID_USERNAME_OR_PASSWORD,
        );
      }
      if (!user?.isVerified) {
        const { mobile } = user;
        await this.resendOtp({ mobile });
        throw new ForbiddenException(ResponseMessage.NON_VERIFIED_ACCOUNT);
      }
      delete user.password;
      return {
        accessToken: this.jwtService.sign(
          { username: user.username, sub: user._id },
          {
            expiresIn: process.env.JWT_EXPIRATION_TIME,
          },
        ),
        user,
      };
    } catch (error) {
      throw error;
    }
  }

  async resendOtp(payload: { mobile: string }) {
    try {
      const { mobile } = payload;
      const otp: IOTP = generateOtpWithExpiry();
      await this.userRepository.findOneAndUpdate(
        {
          mobile,
        },
        { $set: { otp: otp, isVerified: false } },
      );
      return null;
    } catch (error) {
      throw error;
    }
  }

  async verifyOtp(payload: IVerifyOtp) {
    try {
      const { mobile, otpCode } = payload;
      const response = await this.userRepository.findOneAndUpdate(
        {
          mobile: mobile,
          'otp.code': otpCode,
          'otp.expiresAt': { $gt: new Date() }, // Check if the OTP is not expired
        },
        { $set: { otp: null, isVerified: true } },
        { notFoundThrowError: false },
      );
      if (!response) throw new BadRequestException(ResponseMessage.INVALID_OTP);
      return null;
    } catch (error) {
      throw error;
    }
  }

  async verifyToken(payload: IVerifyToken) {
    try {
      const { token } = payload;
      const decoded = this.jwtService.verify(token, {
        secret: `${process.env.JWT_SECRET_KEY}`,
      });
      if (!decoded || !decoded?.sub)
        throw new UnauthorizedException('Invalid Token');
      const user = await this.userRepository.findOne({
        username: decoded?.username,
        isActive: true,
      });
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(payload: IForgotPassword) {
    try {
      const { mobile } = payload;
      const user = await this.userRepository.findOne(
        { mobile, isActive: true },
        { _id: 1, mobile: 1 },
      );
      const otp = generateOtpWithExpiry();

      // TODO: Send OTP to user's mobile
      await this.userRepository.findOneAndUpdate(
        { _id: user?._id },
        { $set: { otp: otp } },
      );
      return null;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(payload: IChangePassword) {
    try {
      const { mobile, password } = payload;
      const hashedPassword = await Hash.make(password);
      await this.userRepository.findOneAndUpdate(
        { mobile, isActive: true },
        { $set: { password: hashedPassword } },
      );
      return null;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(payload: IResetPassword) {
    try {
      const { userId, oldPassword, newPassword } = payload;
      const user = await this.userRepository.findOne(
        { _id: userId, isActive: true },
        { password: 1 },
        { notFoundThrowError: false },
      );
      if (!user || !(await Hash.compare(oldPassword, user?.password))) {
        throw new BadRequestException(ResponseMessage.INVALID_LOGIN_PASSWORD);
      }

      // TODO: For security purpose: Send OTP

      const hashedPassword = await Hash.make(newPassword);
      await this.userRepository.findOneAndUpdate(
        { userId },
        { $set: { password: hashedPassword } },
      );
      return null;
    } catch (error) {
      throw error;
    }
  }
}
