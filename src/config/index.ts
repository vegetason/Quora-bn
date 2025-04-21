import dotenv from 'dotenv'

dotenv.config()
export const POSTGRES_HOST = process.env.POSTGRES_HOST
export const PORT = parseInt(process.env.PORT as string, 10) || 3000
export const POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT as string, 10)
export const DB_HOST_TYPE = process.env.DB_HOST_TYPE
export const DEV_DATABASE_URL = process.env.DEV_DATABASE_URL
export const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL
export const PROD_DATABASE_URL = process.env.PROD_DATABASE_URL
