import multer from 'multer'

const UPLOAD_DIR = process.env.UPLOAD_DIR
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR)
  },
  filename: (req, file, cb) => {
    const [filename, extension] = file.originalname.split('.')
    cb(null, `${filename}_${Date.now().toString()}.${extension}`)
  }
})

export const upload = multer({
  storage: storage,
  limits: {fileSize: 800000},
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      return cb(null, true)
    }
    cb(new Error('Wrong format file'))
  },
});