import multer from "multer"
import path from "path"
import fs from "fs"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '/public/images')
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir, {recursive: true})
        }
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})

const Upload = multer({
    storage: storage,
    limits: {fileSize: 5 * 1024 * 1024},
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