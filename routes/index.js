import routerx from "express-promise-router";
import CategotiaRouter from "./Categoria";
import ArticuloRouter from "./Articulo";

const router = routerx();

router.use("/categoria", CategotiaRouter);
router.use("/articulo", ArticuloRouter);

export default router;
