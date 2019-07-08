import models from "../models";
import bcrypt from "bcryptjs";
import token from "../services/token";
const Usuario = models.Usuario;

export default {
  add: async (req, res, next) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const data = await Usuario.create(req.body);
      res.status(200).json(data);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error"
      });
      next(e);
    }
  },
  query: async (req, res, next) => {
    try {
      const data = await Usuario.findOne({ _id: req.query._id });
      if (!data) {
        res.status(404).send({
          message: "El registro no existe"
        });
      } else {
        res.status(200).json(data);
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error"
      });
      next(e);
    }
  },
  list: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const data = await Usuario.find(
        {
          $or: [
            { nombre: new RegExp(valor, "i") },
            { email: new RegExp(valor, "i") }
          ]
        },
        { createdAt: 0 }
      ).sort({ createdAt: -1 });
      res.status(200).json(data);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error"
      });
      next(e);
    }
  },
  update: async (req, res, next) => {
    let {
      _id,
      rol,
      nombre,
      tipo_documento,
      num_documento,
      direccion,
      telefono,
      email,
      password,
      estado
    } = req.body;

    /*Si el password no se modifica no hay que volverlo a incriptar*/
    if (password.lenght < 64) {
      password = await bcrypt.hash(password, 10);
    }

    try {
      const data = await models.Usuario.findByIdAndUpdate(
        { _id },
        {
          rol,
          nombre,
          tipo_documento,
          num_documento,
          direccion,
          telefono,
          email,
          password,
          estado
        }
      );
      if (!data) {
        res.status(404).send({
          message: "El registro no existe"
        });
      } else {
        res.status(200).json(data);
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error"
      });
      next(e);
    }
  },
  remove: async (req, res, next) => {
    try {
      const data = await models.Usuario.findByIdAndDelete({
        _id: req.body._id
      });
      res.status(200).json(data);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error"
      });
      next(e);
    }
  },
  activate: async (req, res, next) => {
    try {
      const data = await Usuario.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 1 }
      );
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error"
      });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const data = await Usuario.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 0 }
      );
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error"
      });
      next(e);
    }
  },

  login: async (req, res, next) => {
    let { email, password } = req.body;

    try {
      let user = await Usuario.findOne({ email: email });
      if (user) {
        //Existe Usuario
        let match = await bcrypt.compare(password, user.password);
        if (match) {
          let tokenReturn = await token.encode(user._id);
          res.status(200).json({ user, token: tokenReturn });
        } else {
          res.status(404).send({
            message: "Password Incorrecto"
          });
        }
      } else {
        res.status(404).send({
          message: "No existe el Usuario"
        });
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error"
      });
      next(e);
    }
  }
};
