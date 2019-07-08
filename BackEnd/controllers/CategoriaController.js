import models from "../models";
const Categoria = models.Categoria;

export default {
  add: async (req, res, next) => {
    try {
      const data = await Categoria.create(req.body);
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
      const data = await Categoria.findOne({ _id: req.query._id });
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
      const data = await Categoria.find(
        {
          $or: [
            { nombre: new RegExp(valor, "i") },
            { descripcion: new RegExp(valor, "i") }
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
    let { _id, nombre, descripcion } = req.body;
    try {
      const data = await models.Categoria.findByIdAndUpdate(
        { _id },
        { nombre, descripcion }
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
      const data = await models.Categoria.findByIdAndDelete({
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
      const data = await Categoria.findByIdAndUpdate(
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
      const data = await Categoria.findByIdAndUpdate(
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
