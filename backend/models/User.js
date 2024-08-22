import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcrypt';

const {Schema} = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
        validate:[
            {
                validator: value => validator.isStrongPassword(value),
                message: "Password must containg one or more lowercase, uppercase, number and symbol",
                // validator: value => value.length >= 6,
                // message: "Password must be at least 6 digit"
            }
        ]
    }
   
},
{
    timestamps: true
})

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        return next(); 
    }

    const salt = await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password, salt)
    next();

})

userSchema.methods.comparePassword = async function (givenPaaword){
    return await bcrypt.compare(givenPaaword, this.password)
}

const User = mongoose.model('User', userSchema)
export default User


