import models from "../models";
const Articulo = models.Articulo;

export default {
  aumentarStock: async (idArticulo, cantidad) => {
    let { stock } = await Articulo.findOne({ _id: idArticulo });
    let nStock = parseInt(stock) + parseInt(cantidad);
    const data = await Articulo.findByIdAndUpdate(
      { _id: idArticulo },
      { stock: nStock }
    );
  },
  disminuirStock: async (idArticulo, cantidad) => {
    let { stock } = await Articulo.findOne({ _id: idArticulo });
    let nStock = parseInt(stock - cantidad);
    const data = await Articulo.findByIdAndUpdate(
      { _id: idArticulo },
      { stock: nStock }
    );
  }
};
