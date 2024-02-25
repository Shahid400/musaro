export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  PROVIDER = 'PROVIDER',
}

export enum ProviderType {
  INDIVIDUAL = 'INDIVIDUAL',
  ESTABLISHEDMENT = 'ESTABLISHEDMENT',
}

export enum AppLanguage {
  ENGLISH = 'ENGLISH',
  ARABIC = 'ARABIC',
}

export enum PaymentOption {
  MADA = 'MADA',
  VISA = 'VISA',
  PAYPAL = 'PAYPAL',
  APPLE_PAY = 'APPLE_PAY',
}

export enum SubscriptionType {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export enum PaymentType {
  SUBSCRIPTION = 'SUBSCRIPTION',
  WORKSHOP_FEE = 'WORKSHOP_FEE',
  WORKSHOP_TICKET = 'WORKSHOP_TICKET',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ProfileStatus {
  BLOCKED = 'blocked by admin',
  APPROVAL_PENDING = 'admin approval pending',
}

export enum FileContentTypes {
  CSV = 'application/vnd.openxmlformats',
  PDF = 'application/pdf',
  JSON = 'application/json',
}

export enum ResponseMessage {
  INVALID_PASSWORD = `Invalid Password. Use 8-15 characters with a mix of letters, numbers & symbols`,
  INVALID_NAME = `Invalid name`,
  INVALID_USERNAME = `Invalid user name`,
  INVALID_LOGIN_PASSWORD = `Invalid password`,
  INVALID_USERNAME_OR_PASSWORD = `Invalid username or password`,
  USERNAME_ALREADY_EXISTS = 'user name not available',
  MOBILE_ALREADY_EXISTS = 'an account against this mobile already exists',
  INVALID_OTP = 'invalid or expired OTP',
  INVALID_TOKEN = 'Invalid Token',
  NON_ACTIVE_ACCOUNT = 'Account disabled',
  NON_VERIFIED_ACCOUNT = 'Account not verified! Verify the OTP sent to mobile',
}
