import mongoose, { schemaOptionsBase } from "../../_database/index.js";

const conviteSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    remetenteNome: {
        type: String,
        required: true
    },
    projetoId: {
        type: String
    },
    destinatario: {
        type: String
    },
    descricao: {
        type: String
    },
    status: {
        type: ['aceito', 'recusado', 'pendente'],
        default: ['pendente']
    },
}, schemaOptionsBase);

export const Notificacao = mongoose.model('convite', conviteSchema)
