import * as relatorioController from './relatorio.controller.js'
import { Router } from 'express';
const router = Router();

router
    .get('/', relatorioController.buscarTodos)
    .post('/', relatorioController.criar)

export default router;