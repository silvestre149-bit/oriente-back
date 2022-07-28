import mongoose, { schemaOptionsBase } from '../../_database/index.js';

const options = { ...schemaOptionsBase, discriminatorKey: 'tipo' };

const usuarioSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },

    cod: {
        type: String,
        unique: true,
        require: true,
    },

    senha: {
        type: String,
        require: true,
    },

    tipo: {
        type: String,
        require: true
    },

    participacoes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'participacao',
        default: undefined
    }],
    
    tccDuplo: {
        type: Boolean,
        default: false
    }

}, options);


export const Usuario
    = mongoose.model('usuario', usuarioSchema);
