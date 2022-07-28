import mongoose from '../../_database/index.js';
import { Usuario } from './usuario.entity.js';

const AlunoSchema = mongoose.Schema({
    turmas: {
        type: Object
    },
    tcc: [{
        type: Number
    }],
    duploTCC: {
        type: Number
    },
    etapa: {
        type: Number
    },
    campus: {
        type: String
    },
    unidade: {
        type: String
    },
    componente: {
        type: String
    },
    convites: [{
        type: mongoose.Schema.Types.ObjectId,
    }]
});

export const Aluno
    = Usuario.discriminator("aluno", AlunoSchema);