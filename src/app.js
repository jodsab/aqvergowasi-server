import express from 'express'
import morgan from 'morgan';
import cors from 'cors'
//DB CONNECTED
import mongoose from './database.js';
//IMPORTING ROUTES
import usersRoutes from './routes/users.routes.js';
import coursesRoutes from './routes/courses.routes.js';

//APP INICIALIZATED
const app = express();

const port = 4000;

//MIDDLEWARES
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//ROUTES
app.use("/api/users", usersRoutes);
app.use("/api/courses", coursesRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
