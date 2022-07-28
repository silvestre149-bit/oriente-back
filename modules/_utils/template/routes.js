
import { Router } from 'express';
const router = Router();

router
    .get('/', controller.buscarTodos)
    .get('/:id', controller.buscarUm)
    .post('/', controller.criar)
    .patch('/:id', controller.atualizar)
    .delete('/:id', controller.deletar);

export default router;