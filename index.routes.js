import { Router } from "express";

const router = Router();

import usuarioRouter from './modules/usuario/usuario.routes.js';
import relatorioRouter from './modules/relatorio/relatorio.routes.js';
import semestreRouter from './modules/semestre/semestre.routes.js';
import projetoRouter from './modules/projeto/projeto.routes.js';
import notificacaoRouter from './modules/notificacoes/notificacao.routes.js';
import participacaoRouter from './modules/participacao/participacao.routes.js'
import sessaoRouter from './modules/sessoes/sessao.routes.js'
import authRouter from './modules/auth/auth.routes.js';
import initRouter from './modules/_init/init.routes.js'

/* GET home page. */
router.get('/', function (req, res) {
  res.json({ status: 'ok' })
});

router.use('/projeto', projetoRouter);
router.use('/participacao', participacaoRouter);
router.use('/relatorio', relatorioRouter);
router.use('/semestre', semestreRouter);
router.use('/usuario', usuarioRouter);
router.use('/notificacoes', notificacaoRouter);
router.use('/auth', authRouter);
router.use('/init', initRouter);
router.use('/sessao', sessaoRouter);



export default router;
