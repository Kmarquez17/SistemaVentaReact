import routerx from "express-promise-router";
import CategotiaRouter from "./Categoria";

const router = routerx();

router.use("/categoria", CategotiaRouter);

export default router;
