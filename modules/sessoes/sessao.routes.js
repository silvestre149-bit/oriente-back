import * as sessaoController from './sessao.controller.js';

import { Router } from 'express';
const router = Router();

router
    .get('/', sessaoController.buscarTodos)
    .get('/:id', sessaoController.buscarUm)
    .post('/', sessaoController.criar)
    .delete('/:id', sessaoController.deletar)
    .delete('/', sessaoController.deletarTodos)


export default router;