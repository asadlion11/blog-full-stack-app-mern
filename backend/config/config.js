import dotenv from 'dotenv'

dotenv.config()


export const mongo_url = process.env.MONGO_URL
export const jwt_secret = process.env.JWT_SECRET

export const cloudinary_cloud_name = process.env.CLOUDINARY_CLOUD_NAME
export const cloudinary_api_key = process.env.CLOUDINARY_API_KEY
export const cloudinary_api_secret = process.env.CLOUDINARY_API_SECRET

