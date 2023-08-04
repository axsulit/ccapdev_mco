import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
    const destinationPath = path.join(__dirname, '../../public/images');
      cb(null,destinationPath);
    },
    filename: (req, file, cb)=>{
      console.log(file);
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

const upload = multer({storage: storage}).single('image');

export const uploads = upload;
