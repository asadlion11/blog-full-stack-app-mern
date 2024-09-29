// import cloudinary from 'cloudinary';
import { cloudinary_api_key, cloudinary_api_secret, cloudinary_cloud_name } from './config.js';
import { v2 as cloudinary } from 'cloudinary'

// cloudinary.v2.config({
//     cloud_name: cloudinary_cloud_name,
//     api_key: cloudinary_api_key,
//     api_secret: cloudinary_api_secret
// })

// export default cloudinary.v2

// const cloudinary = require('cloudinary');
// const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: cloudinary_cloud_name, 
    api_key:cloudinary_api_key, 
    api_secret: cloudinary_api_secret
  });


export default cloudinary