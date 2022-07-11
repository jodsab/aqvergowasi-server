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

coursesRoutes.post(
  "/addnewcourse",
  upload.fields([
    { name: "image", maxCount: 2 },
    { name: "pdf", maxCount: 2 },
  ]),
  async (req, res) => {
    try {
      const { name, description, youWillLearn } = req.body;
      const course = Course({
        name,
        description,
        youWillLearn,
      });

      if (req.files) {
        req.files?.image && course.setImage(req.files.image[0]?.filename);
        req.files?.pdf && course.setPdf(req.files.pdf[0]?.filename);
      }

      const courseStored = await course.save();

      res.status(201).send(courseStored);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

coursesRoutes.put("/listofcourses/:id/put", upload.none(), async (req, res) => {
  try {
    res.status(201);
  } catch (err) {
    res.status(400).send(err);
  }
});

coursesRoutes.delete(
  "/listofcourses/:id/delete",
  upload.none(),
  async (req, res) => {
    try {
      const courseDeleted = await Course.deleteOne({ _id: req.params.id });
      res.status(201).send(courseDeleted);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

export default coursesRoutes;
