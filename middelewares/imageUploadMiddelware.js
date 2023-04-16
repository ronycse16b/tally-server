
import multer from 'multer';
import path from 'path'

// Multer configuration


const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + "-" + file.originalname)
  }
})


export const uploader = multer({
  storage: storage,

  fileFilter: (req, file, cb) => {
    const supportedImage = /png|jpg/;
    const extention = path.extname(file.originalname);

    if (supportedImage.test(extention)) {
      cb(null, true)

    } else {
      cb(new Error("Must provide jpg or png file"))
    }
  },
  limits: {
    fileSize: 1000000,
  }
})
