import mongoose from 'mongoose';

export const Permissoes = mongoose.Schema({
    cadastraProjeto: {
        type: Boolean,
        default: true,
    },

    professorAceitaProjeto: {
        type: Boolean,
        default: true,
    },

    sessaoPoster: {
        type: Boolean,
        default: false,
    }
})