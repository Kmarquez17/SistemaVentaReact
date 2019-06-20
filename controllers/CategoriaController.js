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
      const data = await Categoria.find({});
      res.status(200).json(data);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error"
      });
      next(e);
    }
  },
  update: async (req, res, next) => {
    const { _id, nombre, descripcion, estado } = req.body;

    try {
      const data = await Categoria.findByIdAndUpdate(
        { _id: req.body._id },
        { _id, nombre, descripcion, estado }
      );
      res.send.status(200).json(data);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error"
      });
      next(e);
    }
  },
  remove: async (req, res, next) => {
    try {
      const data = Categoria.findByIdAndDelete({ _id: req.body._id });
      res.status(200).json(data);
    } catch (e) {
      if (e.kind === "ObjectId") {
        res.status(404).send({
          message: "El Id no existe"
        });
      } else {
        res.status(500).send({
          message: "Ocurrio un error"
        });
      }
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
