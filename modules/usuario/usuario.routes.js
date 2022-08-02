import * as usuarioController from './usuario.controller.js';
import * as usuarioParticipacaoController from './usuarioParticipacao.controller.js';

import { Router } from 'express';
const router = Router();

router
    .get('/', usuarioController.buscarTodos)
    .get('/:id', usuarioController.buscarUm)
    .get('/cod/:cod', usuarioController.buscarCod)
    .get('/buscar/professores', usuarioController.buscarProfessores)
    .get('/buscar/alunos', usuarioController.buscarAlunos)
    .post('/', usuarioController.criar)
    .post('/:id/participacao', usuarioParticipacaoController.adicionarParticipacao)
    .patch('/:id', usuarioController.atualizar)
    .patch('/:id/turmas', usuarioController.atualizarAluno)
    .delete('/:id', usuarioController.deletar)
    .delete('/', usuarioController.deletarTodos)
    .delete('/deletar/alunos/:id', usuarioController.deletarTodosAlunos)
    .patch('/:id/remover/participacao', usuarioParticipacaoController.removerParticipacao)


export default router;