import { Router } from 'express';
import multer from "multer";
import path from "path";
import profileController from '../controllers/profileController.js';
import { fileURLToPath } from 'url';

const profileRouter = Router();
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

const upload = multer({storage: storage});
profileRouter.get("/profile/:username", profileController.getProfile);
profileRouter.get("/edit-profile/:username", profileController.editProfile);
profileRouter.post("/edit-profile/saveDescription", upload.single("image"), profileController.saveDescription);
profileRouter.post("/upload", upload.single("image"), profileController.uploadFile);

export default profileRouter;