import jwt from 'jsonwebtoken';
import { jwt_secret } from '../config/config.js';

const authentication = (req, res, next) => {
    const token = req.cookies.token
    
    // console.log(`token: ${token}`)

    if(!token) return res.send(403).send("Access denie+d please login")

    try {
        const decoded = jwt.verify(token, jwt_secret)
        // console.log("decoded:" , decoded)

        req.user = decoded

        next()
        
    } catch (err) {
        return res.send(403).send("Access denie+d please login")

    }

}



export default authentication