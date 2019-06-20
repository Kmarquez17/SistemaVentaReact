import routerx from "express-promise-router";
import CategoriaController from "../controllers/CategoriaController";

const router = routerx();

router.post("/add", CategoriaController.add);
router.get("/query", CategoriaController.query);
router.get("/list", CategoriaController.list);
router.put("/update", CategoriaController.update);
router.delete("/remove", CategoriaController.remove);
router.put("/activate", CategoriaController.activate);
router.put("/deactivate", CategoriaController.deactivate);

export default router;
