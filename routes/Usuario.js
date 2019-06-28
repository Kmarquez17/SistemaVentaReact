import routerx from "express-promise-router";
import UsuarioController from "../controllers/UsuarioController";
import auth from "../middlewares/auth";

const router = routerx();

router.post("/add", auth.verificarAdministrador, UsuarioController.add);
router.get("/query", auth.verificarAdministrador, UsuarioController.query);
router.get("/list", auth.verificarAdministrador, UsuarioController.list);
router.put("/update", auth.verificarAdministrador, UsuarioController.update);
router.delete("/remove", auth.verificarAdministrador, UsuarioController.remove);
router.put("/activate", auth.verificarAdministrador, UsuarioController.activate);
router.put("/deactivate", auth.verificarAdministrador, UsuarioController.deactivate);
router.post("/login", UsuarioController.login);

export default router;
