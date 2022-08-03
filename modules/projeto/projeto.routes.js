import * as projetoController from './projeto.controller.js'
import { Router } from 'express';
const router = Router();

router
    .get('/', projetoController.buscarTodos)
    .get('/:id', projetoController.buscarUm)
    .get('/aluno/:id', projetoController.buscarUmProjetoAluno)
    .get('/professor/:id', projetoController.buscarProjetosProfessor)
    .get('/orientador/:id', projetoController.buscarOrientadorNoProjeto)
    .get('/orientador/status/:id', projetoController.buscarOrientadorStatus)
    .get('/avaliador/:id', projetoController.buscarAvaliadorNoProjeto)
    .get('/suplente/:id', projetoController.buscarSuplenteNoProjeto)
    .post('/', projetoController.criar)
    .patch('/participante/:id', projetoController.inserirParticipante)
    .patch('/aluno', projetoController.registrarProjeto)
    .patch('/orientador/:id', projetoController.aceitarOrientador)
    .patch('/avaliador/:id', projetoController.aceitarAvaliador)
    .patch('/suplente/:id', projetoController.aceitarSuplente)
    .patch('/cronograma/:id', projetoController.adicionarCronograma)
    .patch('/remover/aluno/:id', projetoController.removerAluno)
    .patch('/remover/orientador/:id', projetoController.removerOrientador)
    .patch('/remover/avaliador/:id', projetoController.removerAvaliador)
    .patch('/remover/suplente/:id', projetoController.removerSuplente)
    .patch('/:id', projetoController.atualizar)
    .delete('/deletar/todos/:id', projetoController.deletarTodos)
    .delete('/:id', projetoController.deletar)

export default router;