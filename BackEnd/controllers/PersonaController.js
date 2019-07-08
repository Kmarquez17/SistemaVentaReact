import models from "../models";
const Persona = models.Persona;
import mongoose from "mongoose";

export default {
  add: async (req, res, next) => {
    try {
      const data = await Persona.create(req.body);
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
      const data = await Persona.findOne({ _id: req.query._id });
      console.log(data);
      if (!data) {
        res.status(404).send({
          message: "El registro no existe"
        });
      } else {
        res.status(200).json(data);
      }
    } catch (e) {
      let validId = mongoose.Types.ObjectId.isValid(req.query._id);
      console.log(validId);
      if (!validId) {
        res.status(404).send({
          message: "El registro no existe"
        });
      } else {
        res.status(500).send({
          message: "Ocurrio un error"
        });
      }
      next(e);
    }
  },
  list: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const data = await Persona.find(
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
  listClientes: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const data = await Persona.find(
        {
          $or: [
            { nombre: new RegExp(valor, "i") },
            { email: new RegExp(valor, "i") }
          ],
          tipo_persona: "Clientes"
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
  listProveedores: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const data = await Persona.find(
        {
          $or: [
            { nombre: new RegExp(valor, "i") },
            { email: new RegExp(valor, "i") }
          ],
          tipo_persona: "Proveedor"
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
      tipo_persona,
      nombre,
      tipo_documento,
      num_documento,
      direccion,
      telefono,
      email,
      estado
    } = req.body;

    try {
      const data = await models.Persona.findByIdAndUpdate(
        { _id },
        {
          tipo_persona,
          nombre,
          tipo_documento,
          num_documento,
          direccion,
          telefono,
          email,
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
      const data = await models.Persona.findByIdAndDelete({
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
      const data = await Persona.findByIdAndUpdate(
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
      const data = await Persona.findByIdAndUpdate(
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
  }
};
