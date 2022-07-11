import express from "express";
import bcryptjs from "bcryptjs";
import User from "../models/usersSchema.js";
import upload from "../helpers/storage.js";

const usersRoutes = express.Router();

usersRoutes.post("/login", upload.none(), async (req, res) => {
  try {
    //Validar Schema con el body.
    const { error } = User.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    const validPassword = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).json({ error: "contraseña no válida" });

    res.json({
      error: null,
      data: "exito bienvenido",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

usersRoutes.post("/register", upload.none(), async (req, res) => {
  try {
    const { email, password, celNumber, ocupation, country } = req.body;
    const user = new User({
      email,
      password,
      celNumber,
      ocupation,
      country,
    });
    const userRegister = await user.save();
    res.status(201).json(userRegister);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

usersRoutes.get("/listofusers", upload.none(), async (req, res) => {
  try {
    const listOfUsers = await User.find(
      {},
      {
        _id: 1,
        name: 1,
        rol: 1,
        email: 1,
        company: 1,
        ocupation: 1,
        country: 1,
        createdAt: 1,
        celNumber: 1
      }
    );
    res.status(201).json(listOfUsers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default usersRoutes;
