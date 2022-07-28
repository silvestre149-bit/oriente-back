import mongoose from 'mongoose';
import { schemaOptionsBase } from '../../_database/index.js';
import { Permissoes } from './permissao.entity.js';
const Schema = mongoose.Schema;

const SemestreSchema = new Schema({
    titulo: {
        type: String,
        required: true,
    },

    dataAbertura: {
        type: String,
    },

    dataFechamento: {
        type: String,
    },

    permissoes: Permissoes,

    status: {
        type: String,
        default: "aberto"
    },

    projetos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projeto'
    }],

    turmas: {
        type: Array
    },

    listaSessoes: [{
    }]

}, schemaOptionsBase);

const Semestre = mongoose.model('semestre', SemestreSchema);
export default Semestre;