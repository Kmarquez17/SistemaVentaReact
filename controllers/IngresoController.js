import models from "../models";
const Ingreso = models.Ingreso;
const Articulo = models.Articulo;

async function aumentarStock(idArticulo, cantidad) {
  let { stock } = await Articulo.findOne({ _id: idArticulo });
  let nStock = parseInt(stock) + parseInt(cantidad);
  const data = await Articulo.findByIdAndUpdate(
    { _id: idArticulo },
    { stock: nStock }
  );
}
async function disminuirStock(idArticulo, cantidad) {
  let { stock } = await Articulo.findOne({ _id: idArticulo });
  let nStock = parseInt(stock - cantidad);
  const data = await Articulo.findByIdAndUpdate(
    { _id: idArticulo },
    { stock: nStock }
  );
}

export default {
  add: async (req, res, next) => {
    try {
      const data = await models.Ingreso.create(req.body);
      //Actualizar stock
      let detalles = req.body.detalles;
      detalles.map(function(x) {
        aumentarStock(x._id, x.cantidad);
      });
      res.status(200).json(data);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error"
      });
      next(e);
    }
  },
  query: async (req, res, next) => {
    try {
      const data = await Ingreso.findOne({ _id: req.query._id })
        .populate("usuario", { nombre: 1 })
        .populate("persona", { nombre: 1 });
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
      const data = await Ingreso.find(
        {
          $or: [
            { num_comprobante: new RegExp(valor, "i") },
            { serie_comprobante: new RegExp(valor, "i") }
          ]
        },
        { createdAt: 0 }
      )
        .populate("usuario", { nombre: 1 })
        .populate("persona", { nombre: 1 })
        .sort({ createdAt: -1 });
      res.status(200).json(data);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error"
      });
      next(e);
    }
  },
  /*
  update: async (req, res, next) => {
    let { _id, nombre, descripcion } = req.body;
    try {
      const data = await models.Ingreso.findByIdAndUpdate(
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
      const data = await models.Ingreso.findByIdAndDelete({
        _id: req.body._id
      });
      res.status(200).json(data);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error"
      });
      next(e);
    }
  },*/
  activate: async (req, res, next) => {
    try {
      const data = await Ingreso.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 1 }
      );
      //Actualizar stock
      let detalles = data.detalles;
      detalles.map(function(x) {
        aumentarStock(x._id, x.cantidad);
      });
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
      const data = await Ingreso.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 0 }
      );

      //Actualizar stock
      let detalles = data.detalles;
      detalles.map(function(x) {
        disminuirStock(x._id, x.cantidad);
      });

      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error"
      });
      next(e);
    }
  }
};
