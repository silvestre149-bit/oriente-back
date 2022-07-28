import * as notificacaoController from './notificacao.controller.js'
import { Router } from 'express';
const router = Router();

router
    .get('/', notificacaoController.buscarTodas)
    .get('/:id', notificacaoController.buscarNotificacoes)
    .post('/', notificacaoController.criar)
    .post('/participantes', notificacaoController.enviarConvitesParticipantes)
    .delete('/:id', notificacaoController.deletar)

export default router;