import dotenv from 'dotenv'

dotenv.config()

export const port = process.env.PORT
export const mongo_url = process.env.MONGO_URL

