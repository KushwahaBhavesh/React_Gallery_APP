import mongoose from 'mongoose'
import dotenv from 'dotenv'

// configure
dotenv.config();

const connectDB = async()=>{
  try{
    await mongoose.connect(process.env.CONNECTION_URI)
    console.log("connected to mongodb");
  }
  catch(error){
    console.log("mongodb connection: ",error);
    process.exit(1)
  }
}


export default connectDB