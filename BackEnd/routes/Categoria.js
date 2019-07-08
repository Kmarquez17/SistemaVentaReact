import routerx from "express-promise-router";
import CategoriaController from "../controllers/CategoriaController";
import auth from '../middlewares/auth'

const router = routerx();

router.post("/add", auth.verificarAlmacenero, CategoriaController.add);
router.get("/query", auth.verificarAlmacenero, CategoriaController.query);
router.get("/list", auth.verificarAlmacenero, CategoriaController.list);
router.put("/update", auth.verificarAlmacenero, CategoriaController.update);
router.delete("/remove", auth.verificarAlmacenero, CategoriaController.remove);
router.put("/activate", auth.verificarAlmacenero, CategoriaController.activate);
router.put("/deactivate", auth.verificarAlmacenero, CategoriaController.deactivate);

export default router;
