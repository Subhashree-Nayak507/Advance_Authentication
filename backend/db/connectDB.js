import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB= async() =>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb is connected")
    }catch(error){
        console.log(error);
        process.exit(1); //failure is 1,0 status code is success ;
        // it is  synchronous operation which immediately terminates the process without waiting for any asynchronous operations to complete.
    }
}