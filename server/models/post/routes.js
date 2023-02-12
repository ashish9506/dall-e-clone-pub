import express from "express";
import controller from './controller.js'
const router = express.Router();

router.get('/',controller.getPosts)
router.post('/',controller.createPost)

export default router

