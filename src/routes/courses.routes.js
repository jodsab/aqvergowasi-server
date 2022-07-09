import express from "express";
import Course from "../models/coursesSchema.js";
import upload from "../helpers/storage.js";

const coursesRoutes = express.Router();

coursesRoutes.get("/listofcourses", async (req, res) => {
  try {
    const listOfCourses = await Course.find();
    res.status(201).send(listOfCourses);
  } catch (err) {
    res.status(400).send(err);
  }
});

coursesRoutes.get("/listofcourses/:id", async (req, res) => {
  try {
    const course = new Course({
      _id: req.params.id,
    });
    const courseById = await Course.findById(course);
    console.log(typeof courseById);
    res.status(201).send(courseById);
  } catch (err) {
    res.status(400).send(err);
  }
});

coursesRoutes.post("/addNewCourse", upload.single("filename"), async (req, res) => {
  try {
    const { name, description } = req.body;
    console.log('Entra a agergar curso')
    console.log('name:', name)
    console.log('description:', description)
    if(!req.file){
        console.log('NO EXISTE UN ARCHIVO QUE SE TRATA DE CARGAR')
    }
    const course = Course({
      name,
      description,
    });

    if (req.file) {
      const { filename } = req.file;
      course.setImage(filename);
    }

    const courseStored = await course.save();

    res.status(201).send(courseStored);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default coursesRoutes;
