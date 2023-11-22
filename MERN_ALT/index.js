const express = require('express');
require("dotenv").config();
const multer = require('multer');
const mongoose = require('mongoose')
const path = require('path');
const cors = require('cors');
const { getAltTextReference } = require('./service');
const Image = require('./models/imageModel');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors())

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);
console.log(DB)
    mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: false,
      })
      .then(() => {
        console.log("DB connection successful! ");
      })
      .catch((err) => {
        console.log(err);
      });

const storage = multer.diskStorage({
  destination: './uploads/', 
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, 
}).single('image');

app.get('/api', (req, res) => {
  res.send('This is a GET request!');
});
app.post('/api/upload', async (req, res) => {
  const { imageUrl } = req.body; 

  if (!imageUrl) {
    return res.status(400).json({ error: 'No image URL provided' });
  }

  try {
    
    const imageAltText = await getAltTextReference(imageUrl); 

    console.log('Alt text for the image:', imageAltText);

    const newImage = new Image({
      imageUrl: imageUrl,
      imageAltText: imageAltText.generated_text,
    });

    await newImage.save();

    res.status(200).json({ message: 'Image processed successfully', altText: imageAltText });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
