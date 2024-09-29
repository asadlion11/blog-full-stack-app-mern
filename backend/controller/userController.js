import User from '../models/User.js';
import jwt from 'jsonwebtoken'
import {jwt_secret} from '../config/config.js'

export const registerUser = async (req, res) => {

    //Status Code
    //404 not found
    //500 sever error
    //403 unauthrozied
    //400 bad request

    try{
        // const email = req.body.email
        // const username = req.body.username
        // const password = req.body.password

        const {username, email, password} = req.body
        
        const isUserExists = await User.findOne({
            $or: [
                {email: email.toLowerCase()},
                {username: username.toLowerCase()}  
            ]
        })

        if(isUserExists) {
            return res.status(400).send("Email or Username already exists")
        }

        const userInfo = new User({
            email: email,
            username: username,
            password: password
        })

        await userInfo.save()

        userInfo.password = undefined

        return res.status(201).send(userInfo)

    } catch(err){
        // console.log(err.message)
        res.send(err.message)
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const isUserExists = await User.findOne({email: email.toLowerCase()}).select("+password")
        if(!isUserExists) {
            return res.status(400).send("Invalid email provide a valid email")
        }

        const isPasswordCorrect = await isUserExists.comparePassword(password)
        if(!isPasswordCorrect) {
            return res.status(400).send("Incorrect password")
        }

        // //token generation
        // const expiresIn = 7 * 24 * 60 * 60 //7 days
        const expiresIn = 7 * 24 * 60 * 60 //7 days
        //forever token
        // const expiresIn = Number.MAX_SAFE_INTEGER;
        const token = jwt.sign({_id: isUserExists._id}, jwt_secret, {expiresIn} )

        //using token
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: expiresIn * 1000
        })
        


        isUserExists.password = undefined

        res.status(200).send({...isUserExists.toJSON(), expiresIn})
        //console.log(`token: ${token}`) 
       
    } catch (err) {
        console.log(`Error at login user ${err}`)
        res.status(400).send(err.message)
    }
}
