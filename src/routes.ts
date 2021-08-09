import { Router } from 'express';
import { UserController } from './controllers/UserController';
import authMiddleware from './middlewares/authMiddleware';

const router = Router();

const userController = new UserController();

router.post("/usuarios", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.put("/usuarios", authMiddleware, userController.update);
router.get("/usuarios/:id", authMiddleware, userController.getById);
router.delete("/usuarios/:id", authMiddleware, userController.deleteById);

export { router };
