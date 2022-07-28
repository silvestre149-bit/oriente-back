import * as participacaoController from './participacao.controller.js'

import { Router } from 'express';
const router = Router();

router
    .get('/', participacaoController.buscarTodos)
    .get('/:id', participacaoController.buscarUm)
    .get('/projeto/:id', participacaoController.buscarParticipacoesDeProjeto)
    .post('/', participacaoController.criar)
    .patch('/:id', participacaoController.atualizar)
    .delete('/:id', participacaoController.deletar)
    .delete('/:id/usuario', participacaoController.deletarPartici);

export default router;