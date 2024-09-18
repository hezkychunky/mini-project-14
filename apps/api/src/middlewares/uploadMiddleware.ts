import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images'))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})

const Upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const FileTypes = /jpeg|jpg|png|gif/
        const ExtName = FileTypes.test(path.extname(file.originalname).toLowerCase())
        const mimeType = FileTypes.test(file.mimetype)

        if (mimeType && ExtName) {
            cb(null, true)
        } else {
            cb(new Error('Only images at Allowed'))
        }
    }  
})

export default Upload