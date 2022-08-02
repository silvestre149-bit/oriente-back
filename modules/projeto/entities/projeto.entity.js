import mongoose, { schemaOptionsBase } from "../../_database/index.js";

const projetoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['aberto', 'fechado'],
        default: 'aberto'
    },
    disciplina: {
        type: String
    },
    sessaodePoster: {
        type: String
    },
    cronogramaDeOrientacao: {
        type: Object
    },
    participantes: [],
    semestre: {
        type: String
    }
}, schemaOptionsBase);

export const Projeto = mongoose.model('projeto', projetoSchema)

