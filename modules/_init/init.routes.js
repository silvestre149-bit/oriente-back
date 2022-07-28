import * as initController from './init.controller.js';

import { Router } from 'express';
const router = Router();


router
    .get('/coordenador', initController.cadastrarCoordenador)
    .get('/professor', initController.cadastrarProfessor)
    .get('/aluno', initController.cadastrarAluno)

export default router;