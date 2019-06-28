import routerx from "express-promise-router";
import CategotiaRouter from "./Categoria";
import ArticuloRouter from "./Articulo";
import UsuarioRouter from "./Usuario";
import PersonaRouter from "./Persona";

const router = routerx();

router.use("/categoria", CategotiaRouter);
router.use("/articulo", ArticuloRouter);
router.use("/usuario", UsuarioRouter);
router.use("/persona", PersonaRouter);

export default router;
