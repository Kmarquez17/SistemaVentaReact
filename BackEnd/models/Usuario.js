import mongoose, { Schema } from "mongoose";

const UsuarioSchema = new Schema({
  rol: { type: String, maxlength: 30, required: true },
  nombre: { type: String, maxlength: 50, unique: true, required: true },
  tipo_documento: { type: String, maxlength: 20 },
  num_documento: { type: String, maxlength: 20 },
  direccion: { type: String, maxlength: 70 },
  telefono: { type: String, maxlength: 20 },
  email: { type: String, maxlength: 50, unique: true, required: true },
  password: { type: String, maxlength: 64, required: true },
  estado: { type: String, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("usuario", UsuarioSchema);