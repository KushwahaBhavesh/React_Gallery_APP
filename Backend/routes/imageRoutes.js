import express from 'express'
import imageModels from '../models/imageModels.js'
import multer from 'multer';
import authenticate from '../middleware/authMiddleware.js';




const route = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Frontend/Gallery/src/assets/images/")
  }, filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage })


route.post('/upload', authenticate, upload.single('image'), async (req, res) => {

  const userId = req.userId

  try {

    if (!req.file) {
      return res.status(400).json({ msg: "No image file provided" })
    }
    const imageUrl = req.file.originalname
    const images = new imageModels({ user: userId, imageUrl }).save();
    return res.status(201).json({ success: true, msg: "Upload Successfully", images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }

})


// // GET::: /api/images/user/:userId
// Fetch images associated with the specified user ID
route.get('/user/:userId', authenticate, async (req, res) => {
  const userId = req.params.userId

  try {
    const images = await imageModels.find({ user: userId }).exec();
    if (!images) {
      return res.status(404).json({
        msg: "Image Not Found"
      })
    } else {
      return res.status(201).json(images)
    }

  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" })
  }
})

export default route;
