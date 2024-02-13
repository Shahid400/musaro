import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user-res.dto';
import { ProviderProfileReqDto } from './dto/user-req.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get('provider')
  @HttpCode(HttpStatus.OK)
  // @ApiCreatedResponse({ type: ResponseDto })
  async getProvider(@Req() req: any) {
    const userId = req?.user?._id;
    return await this.userService.getProvider({ userId });
  }

  @Auth()
  @Put('provider-profile')
  @HttpCode(HttpStatus.OK)
  // @ApiCreatedResponse({ type: ResponseDto })
  async updateProviderProfile(
    @Req() req: any,
    @Body() payload: ProviderProfileReqDto,
  ) {
    const userId = req?.user?._id;
    return await this.userService.updateProviderProfile({ userId, ...payload });
  }

  // @Get()
  // async findAll() {
  //   return this.userService.findAll();
  // }
  // @Get(':id')
  // @Auth()
  // async findOne(@Param('id') id: string, @Req() req: any) {
  //   return this.userService.findOne(id);
  // }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
