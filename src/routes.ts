import { Router } from 'express';
import { DoacaoController } from './controllers/DoacaoController';
import { UserController } from './controllers/UsuarioController';
import authMiddleware from './middlewares/authMiddleware';

const router = Router();

const userController = new UserController();
const doacaoController = new DoacaoController();

router.post("/usuarios", userController.register);
router.post("/login", userController.login);
router.post("/logout", authMiddleware, userController.logout);
router.put("/usuarios", authMiddleware, userController.update);
router.get("/usuarios/:id", authMiddleware, userController.getById);
router.delete("/usuarios/:id", authMiddleware, userController.deleteById);

router.post("/doacoes", authMiddleware, doacaoController.store);
router.put("/doacoes", authMiddleware, doacaoController.update);
router.get("/doacoes/:id", authMiddleware, doacaoController.getById);
router.get("/usuarios/:userId/doacoes", authMiddleware, doacaoController.getDoacoesByUserId);
router.delete("/doacoes/:id", authMiddleware, doacaoController.deleteById);

export { router };
