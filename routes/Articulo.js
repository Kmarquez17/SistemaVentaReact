import routerx from "express-promise-router";
import ArticuloController from "../controllers/ArticuloController";
import auth from '../middlewares/auth'

const router = routerx();

router.post("/add", auth.verificarVendedor, ArticuloController.add);
router.get("/query", auth.verificarVendedor, ArticuloController.query);
router.get("/queryCodigo", auth.verificarUsuario, ArticuloController.queryCodigo);
router.get("/list", auth.verificarVendedor, ArticuloController.list);
router.put("/update", auth.verificarVendedor, ArticuloController.update);
router.delete("/remove", auth.verificarVendedor, ArticuloController.remove);
router.put("/activate", auth.verificarVendedor, ArticuloController.activate);
router.put("/deactivate", auth.verificarVendedor, ArticuloController.deactivate);

export default router;
