import mongoose from '../../_database/index.js';


export const Permissoes = mongoose.Schema({
    coordenador: {
        type: Boolean,
        default: false
    },

    orientador: {
        type: Boolean,
        default: false
    },

    avaliador: {
        type: Boolean,
        default: false
    },
    
})
