import routerx from "express-promise-router";
import PersonaController from "../controllers/PersonaController";
import auth from "../middlewares/auth";

const router = routerx();

router.post("/add", auth.verificarUsuario, PersonaController.add);
router.get("/query", auth.verificarUsuario, PersonaController.query);
router.get("/list", auth.verificarUsuario, PersonaController.list);
router.get("/listClientes", auth.verificarUsuario, PersonaController.listClientes);
router.get("/listProveedores", auth.verificarUsuario, PersonaController.listProveedores);
router.put("/update", auth.verificarUsuario, PersonaController.update);
router.delete("/remove", auth.verificarUsuario, PersonaController.remove);
router.put("/activate", auth.verificarUsuario, PersonaController.activate);
router.put("/deactivate", auth.verificarUsuario, PersonaController.deactivate);

export default router;
