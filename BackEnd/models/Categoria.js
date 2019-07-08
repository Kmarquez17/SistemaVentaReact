import mongoose, { Schema } from "mongoose";

const CategoriaSchema = new Schema({
  nombre: { type: String, maxlength: 50, unique: true, required: true },
  descripcion: { type: String, maxlength: 255 },
  estado: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("categoria", CategoriaSchema);
