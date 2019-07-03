import routerx from "express-promise-router";
import VentaController from "../controllers/VentaController";
import auth from "../middlewares/auth";

const router = routerx();

router.post("/add", auth.verificarVendedor, VentaController.add);
router.get("/query", auth.verificarVendedor, VentaController.query);
router.get("/list", auth.verificarVendedor, VentaController.list);
/*router.put("/update", auth.verificarVendedor, VentaController.update);
router.delete("/remove", auth.verificarVendedor, VentaController.remove);*/
router.put("/activate", auth.verificarVendedor, VentaController.activate);
router.put(
  "/deactivate",
  auth.verificarVendedor,
  VentaController.deactivate
);

export default router;
