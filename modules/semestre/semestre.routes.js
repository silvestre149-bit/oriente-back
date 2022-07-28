import * as semestreController from './semestre.controller.js';
import * as semestreProjetoController from './semestreProjeto.controller.js';


import { Router } from 'express';
const router = Router();

router
    .get('/', semestreController.buscarTodos)
    .get('/:id', semestreController.buscarUm)
    .get('/:id/turmas', semestreController.buscarTurmas)
    .get('/:id/projeto', semestreProjetoController.buscarProjetosDeSemestre)
    .get('/status/aberto', semestreController.buscarSemestreAtivo)
    .post('/', semestreController.criar)
    .patch('/:id', semestreController.atualizar)
    .patch('/:id/finalizar', semestreController.fechar)
    .patch('/:id/turmas', semestreController.adicionarTurmas)
    .patch('/:id/projeto', semestreProjetoController.addProjeto)
    .delete('/:id', semestreController.deletar)
export default router;