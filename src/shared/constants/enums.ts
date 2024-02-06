export enum UserRole {
  CUSTOMER = 'Customer',
  SERVICE_PROVIDER = 'ServiceProvider',
}

export enum ResponseMessage {
  INVALID_PASSWORD = `Invalid Password. Use 8-15 characters with a mix of letters, numbers & symbols`,
  INVALID_NAME = `Invalid name`,
  INVALID_USERNAME = `Invalid user name`,
  INVALID_USERNAME_OR_PASSWORD = `Invalid username or password`,
  USERNAME_ALREADY_EXISTS = 'user name already exists',
  MOBILE_ALREADY_EXISTS = 'an account against this mobile already exists',
  INVALID_OTP = 'invalid or expired OTP',
}
