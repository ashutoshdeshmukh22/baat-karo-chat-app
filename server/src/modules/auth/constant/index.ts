export const STRATEGY_LOCAL = 'local';
export const STRATEGY_JWT_AUTH = 'jwt-auth';
export const STRATEGY_JWT_REFRESH = 'jwt-refresh';
export const STRATEGY_GOOGLE = 'google';

export enum SUCCESS_CODES {
  LOGGED_IN_SUCCESS = 'Logged In Success',
  ACCOUNT_CREATED = 'Account created.',
  USER_REGISTERED = 'USER_REGISTERED',
}

export enum ERROR_CODES {
  INVALID_CREDENTIALS = 'The email address or password does not match our records. Please check and try again.',
  ACCOUNT_EXIST_ERROR = 'An account with this email address already existed.',
  USER_NOT_ADDED = 'User not added',
  USER_NOT_FOUND = 'User not found',
}
