import multer from "multer";
// import ImageModel from "../../api/models/image";
import * as fs from "fs";
import { connectToDatabase } from "../../utils/mongodb";
import mongoose from "mongoose";

const imgSchema = new mongoose.Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const ImageModel = mongoose.model("image", imgSchema) || ImageModel();

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const agentsImages = db.collection("agents_images");

  if ((req.method = "POST")) {
    try {
      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "uploads");
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      });

      const upload = multer({ storage: storage });

      await upload.single("testImage");
      // const data = await agentsImages;
      const saveImage = ImageModel({
        name: req.body.name,
        img: {
          data: fs.readFileSync("uploads/" + req.file.filename),
          contentType: "image/jpeg",
        },
      });

      saveImage
        .save()
        .then((res) => {
          console.log("image is saved");
        })
        .catch((err) => {
          console.log(err, "error has occur - could not save image");
        });

      res.status(200).json({ msg: "image is saved" });
    } catch (e) {
      console.log(e);
      console.log("Oops an error occured");
    }
  }
}
