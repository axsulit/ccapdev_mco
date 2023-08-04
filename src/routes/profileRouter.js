import { Router } from 'express';

import profileController from '../controllers/profileController.js';
import { uploads } from '../controllers/uploadController.js';

const profileRouter = Router();

profileRouter.get("/profile/:username", profileController.getProfile);
profileRouter.get("/edit-profile/:username", profileController.editProfile);
profileRouter.post("/edit-profile/saveDescription", uploads, profileController.saveDescription);
profileRouter.post("/upload", uploads, profileController.uploadFile);

export default profileRouter;