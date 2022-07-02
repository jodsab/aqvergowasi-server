import express from 'express'
import Course from '../models/coursesSchema.js'

const coursesRoutes = express.Router()

coursesRoutes.get('/listofcourses', async (req,res) => {
    try{
        const listOfCourses = await Course.find()
        res.status(201).send(listOfCourses)
    } catch(err) {
        res.status(400).send(err)
    }
})

coursesRoutes.get('/listofcourses/:id', async (req,res) => {
    try{
        const course = new Course({
            _id: req.params.id,
        })
        const courseById = await Course.findById(course)
        console.log(typeof courseById)
        res.status(201).send(courseById)
    } catch(err) {
        res.status(400).send(err)
    }
})

coursesRoutes.post('/addNewCourse', async (req,res) => {
    try{
        const course = new Course({
            name: req.body.name,
            description: req.body.description,
        })
        const newCourse = await course.save()
        res.status(201).send(newCourse)
    } catch(err) {
        res.status(400).send(err)
    }
})

export default coursesRoutes