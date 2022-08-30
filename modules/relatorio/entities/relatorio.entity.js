import mongoose, { schemaOptionsBase } from "../../_database/index.js";

const relatorioSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    orientador: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    alunos: {
        type: Array,
        required: true
    },
}, schemaOptionsBase);

export const Relatorio = mongoose.model('relatorio', relatorioSchema)

