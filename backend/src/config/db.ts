import mongoose from 'mongoose'
import { config } from './config'


const connectDb = async () => {
    try {
        mongoose.connection.on('connected', () => {

            console.log("connected to database sucessfully");

        })
        mongoose.connection.on('error', (error) => {
            console.log("error in connecting to database", error);

        })

        await mongoose.connect(config.databaseUrl as string)


    } catch (error) {
        console.error('fail to connect to database ', error)
        process.exit(1);
    }
}
export default connectDb