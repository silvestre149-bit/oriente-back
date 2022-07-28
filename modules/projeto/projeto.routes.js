import * as projetoController from './projeto.controller.js'
import { Router } from 'express';
const router = Router();

router
    .get('/', projetoController.buscarTodos)
    .get('/:id', projetoController.buscarUm)
    .get('/aluno/:id', projetoController.buscarUmProjetoAluno)
    .get('/coordenador/:id', projetoController.buscarCoordenadorNoProjeto)
    .post('/', projetoController.criar)
    .post('/participante/:id', projetoController.inserirParticipante)
    .patch('/aluno', projetoController.registrarProjeto)
    .patch('/orientador/:id', projetoController.aceitarOrientador)
    .patch('/cronograma/:id', projetoController.adicionarCronograma)
    .patch('/remover/orientador/:id', projetoController.removerOrientador)
    .patch('/:id', projetoController.atualizar)
    .delete('/:id', projetoController.deletar)
    .delete('/', projetoController.deletarTodos)

export default router;