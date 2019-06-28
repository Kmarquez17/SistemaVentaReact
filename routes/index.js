import routerx from "express-promise-router";
import CategotiaRouter from "./Categoria";
import ArticuloRouter from "./Articulo";
import UsuarioRouter from './Usuario'

const router = routerx();

router.use("/categoria", CategotiaRouter);
router.use("/articulo", ArticuloRouter);
router.use("/usuario", UsuarioRouter);

export default router;

