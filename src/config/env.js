const ENV = process.env.ENV || process.env.NODE_ENV || 'development'

export const env = {
  ENV,
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || '',
  SECRET_KEY: process.env.SECRET_KEY,
  EXPIRES_IN: process.env.EXPIRES_IN
}