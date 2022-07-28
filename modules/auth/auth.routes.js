
import { Router } from 'express';
import * as authController from './auth.controller.js'
import { loginStrategy } from './local.strategy.js';

const router = Router();

router.post('/login', loginStrategy, authController.login)

export default router;