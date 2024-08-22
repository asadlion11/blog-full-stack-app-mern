import mongoose from "mongoose";

import {mongo_url} from './config.js'
import chalk from "chalk";

const connectDB = async () => {
    try {
        //sucess
        await mongoose.connect(mongo_url)

        console.log(`Connected to database ${chalk.green.bold(mongo_url)}`)

    } catch (e) {
        //errors 
        console.log(`Error for connecting database ${e}`)
        process.exit(1)
    }

}

export default connectDB


