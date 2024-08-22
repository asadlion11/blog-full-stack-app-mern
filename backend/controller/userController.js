import User from '../models/User.js';

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