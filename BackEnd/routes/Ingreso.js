import routerx from "express-promise-router";
import IngresoController from "../controllers/IngresoController";
import auth from "../middlewares/auth";

const router = routerx();

router.post("/add", auth.verificarAlmacenero, IngresoController.add);
router.get("/query", auth.verificarAlmacenero, IngresoController.query);
router.get("/list", auth.verificarAlmacenero, IngresoController.list);
router.get("/graficos", auth.verificarUsuario, IngresoController.graficoMeses);

/*router.put("/update", auth.verificarAlmacenero, IngresoController.update);
router.delete("/remove", auth.verificarAlmacenero, IngresoController.remove);*/
router.put("/activate", auth.verificarAlmacenero, IngresoController.activate);
router.put(
  "/deactivate",
  auth.verificarAlmacenero,
  IngresoController.deactivate
);

export default router;
