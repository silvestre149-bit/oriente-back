import mongoose, { schemaOptionsBase } from "../../_database/index.js";

const participacaoSchema = new mongoose.Schema({
    nome: {
        type: String,
    },
    cod: {
        type: String,
    },
    tipo: {
        type: String,
        required: true,
    },
    status: {
        type: String,
    },
    turmas: {
        type: Object,
    },
    usuarioId: {
        type: String,
        required: true
    },
    semestreId: {
        type: String,
        ref: 'semestre'
    },
    projetoId: {
        type: String,
        ref: 'projeto'
    },
}, schemaOptionsBase);

export const Participacao
    = mongoose.model('participacao', participacaoSchema)