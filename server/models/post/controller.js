import { v2 as cloudinary } from "cloudinary";
import PostModel from "./schema.js";
import config from "config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

export default {
  async getPosts(req, res) {
    try {
      const posts = await PostModel.find({});
      res.status(200).json({ success: true, data: posts });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  },

  async createPost(req, res) {
    const { name, prompt, photo } = req.body;

    try {
      const photoUrl = await cloudinary.uploader.upload(photo);

      const newPost = await PostModel.create({
        name,
        prompt,
        photo: photoUrl.url,
      });

      res.status(200).json({ success: true, data: newPost });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error });
    }
  },
};
