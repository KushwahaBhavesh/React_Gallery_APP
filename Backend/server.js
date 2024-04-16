import express from 'express'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import imageRoutes from './routes/imageRoutes.js'

// Express app
const app = express();

// database connection
connectDB();

// middleware
app.use(express.json())
app.use(cors({
  origin:["http://localhost:5173"],
  methods:["GET","POST"],
  credentials:true
}))
app.use(cookieParser());


// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/image',imageRoutes)

// port setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("running on ", PORT);
})