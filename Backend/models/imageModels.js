import mongoose from 'mongoose'
import userModels from './userModels.js'
const imageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModels,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true
  },
 
},{timestamps:true})

const imageModels = mongoose.model("Image",imageSchema)
export default imageModels
