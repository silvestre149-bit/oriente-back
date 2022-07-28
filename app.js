import './env.js'

import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from "cors";
/* import { config } from 'dotenv'
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
 */
import { passport } from './modules/auth/local.strategy.js';

import indexRouter from './index.routes.js';

/* const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, './config/environment/.env') });
 */
const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()); /* TODO - permitir apenas para front específico, use constiáveis de ambiente para dizer onde será o front */

app.use(passport.initialize())
app.use('/', indexRouter);
/* app.use('/curso', router);
app.use('/administrador/semestre', routerSemestre);
app.use('/professor', routerProfessor); */

export default app;
