import mongoose from "mongoose";
import aqvConfig from "../config/config.js";

const coursesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "Módulo AQV ERGOWASI" },
    imageUrl: { type: String },
    description: { type: String, default: "Este es un curso asombroso!" },
    pdfUrl: { type: String },
    youWillLearn: [String],
    releaseDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

coursesSchema.methods.setImage = function setImage(fileImage) {
  const { appConfig } = aqvConfig;
  const { host, port } = appConfig;

  this.imageUrl = `${host}:${port}/public/${fileImage}`;
};

coursesSchema.methods.setPdf = function setPdf(filePdf) {
  const { appConfig } = aqvConfig;
  const { host, port } = appConfig;

  this.pdfUrl = `${host}:${port}/public/${filePdf}`;
};

const Course = mongoose.model("Course", coursesSchema);

export default Course;
