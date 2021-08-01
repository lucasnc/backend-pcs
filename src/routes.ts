import { Router } from 'express';
import { UserController } from './controllers/UserController';
import authMiddleware from './middlewares/authMiddleware';

const router = Router();

const userController = new UserController();

router.post("/usuarios", userController.register);
router.post("/login", userController.login);
router.get("/usuarios", authMiddleware, userController.getAll);

export { router };
