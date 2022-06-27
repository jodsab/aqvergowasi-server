import express from "express";
import bcryptjs from "bcryptjs";
import User from "../models/usersSchema.js";

const usersRoutes = express.Router();

usersRoutes.post("/login", async (req, res) => {
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

usersRoutes.post("/register", async (req, res) => {
  console.log(req.body)
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      celNumber: req.body.celNumber,
      ocupation: req.body.ocupation,
      country: req.body.country,
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default usersRoutes;
