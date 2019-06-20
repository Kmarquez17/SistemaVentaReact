import routerx from "express-promise-router";
import ArticuloController from "../controllers/ArticuloController";

const router = routerx();

router.post("/add", ArticuloController.add);
router.get("/query", ArticuloController.query);
router.get("/list", ArticuloController.list);
router.put("/update", ArticuloController.update);
router.delete("/remove", ArticuloController.remove);
router.put("/activate", ArticuloController.activate);
router.put("/deactivate", ArticuloController.deactivate);

export default router;
