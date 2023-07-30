import { Router } from "express";
import homepageController from '../controller/homepageController.js'

const homepageRouter = Router();

// insert get/post functions here
homepageRouter.get(`/`, homepageController.getPosts);
export default homepageRouter;