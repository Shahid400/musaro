export enum UserRole {
  CUSTOMER = 'Customer',
  PROVIDER = 'Provider',
}

export enum ProviderType {
  INDIVIDUAL = 'individual',
  ESTABLISHEDMENT = 'establishment',
}

export enum ProfileStatus {
  BLOCKED = 'blocked by admin',
  APPROVAL_PENDING = 'admin approval pending',
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
  NON_VERIFIED_ACCOUNT = 'Non-verified Account! Verify the OTP sent to mobile',
}

export enum FileContentTypes {
  CSV = 'application/vnd.openxmlformats',
  PDF = 'application/pdf',
  JSON = 'application/json',
}
