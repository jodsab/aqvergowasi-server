import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, default: "Módulo AQV ERGOWASI" },
        coursePicture: { type: String },
        description: { type: String, default: "Este es un curso asombroso!" },
        pdf: { type: String },
        releaseDate: { type: Date, default: Date.now },
    }
);

const Course = mongoose.model("Course", coursesSchema);

export default Course;
