import dotenv from 'dotenv'
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

//DB CONNECTED
import mongoose from "./database.js";
//IMPORTING ROUTES
import usersRoutes from "./routes/users.routes.js";
import coursesRoutes from "./routes/courses.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//APP INICIALIZATED
const app = express();

const port = 4000;

dotenv.config({path: '../.env'})
//MIDDLEWARES
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/uploads"));

//ROUTES
app.use("/api/users", usersRoutes);
app.use("/api/courses", coursesRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
