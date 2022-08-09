import * as notificacaoController from './notificacao.controller.js'
import { Router } from 'express';
const router = Router();

router
    .get('/', notificacaoController.buscarTodas)
    .get('/:id', notificacaoController.buscarNotificacoes)
    .get('/pedido/aberto/:id', notificacaoController.buscarPedidoAberto)
    .get('/alunos/pendentes/:id', notificacaoController.buscarConvitesDeAlunosAbertos)
    .post('/', notificacaoController.criar)
    .post('/participantes', notificacaoController.enviarConvitesParticipantes)
    .delete('/:id', notificacaoController.deletar)
    .delete('/deletar/todas/', notificacaoController.deletarTodas)
    .delete('/deletar/varias/:id', notificacaoController.deletarVarias)

export default router;