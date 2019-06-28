import jwt from "jsonwebtoken";
import models from "../models";

let claveSecreta = "clavesecretaparagenerartoken";

const checkToken = async token => {
  let _idAux = null;
  try {
    const { _id } = await jwt.decode(token);
    _idAux = _id;
  } catch (e) {
    return false;
  }
  const user = await models.Usuario.findOne({ _id: _idAux, estado: 1 });
  if (user) {
    const token = jwt.sign({ _id: _idAux }, claveSecreta, { expiresIn: "1min" });
    return { token, rol: user.rol };
  } else {
    return false;
  }
};
export default {
  //Generar el token
  encode: async _id => {
    const token = jwt.sign({ _id: _id }, claveSecreta, { expiresIn: "1min" });
    return token;
  },
  //Validar si el token es correcto
  decode: async token => {
    try {
      //Se descodifica el token, para saber el usuario
      const { _id } = await jwt.verify(token, claveSecreta);      
      const user = await models.Usuario.findOne({ _id: _id, estado: 1 });
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (e) {
      //Si el token expiro, se vuelve a revivir para tener la sesion viva
      const newToken = await checkToken(token);
      return newToken;
    }
  }
};
