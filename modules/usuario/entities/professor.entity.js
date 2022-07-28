import mongoose from '../../_database/index.js';
import { Permissoes } from './permissoes.entity.js';
import { Usuario } from './usuario.entity.js';

const professorSchema = mongoose.Schema({
    permissoes: Permissoes,
    notificacoes: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    
    email: {
        type: String
    }
});


export const Professor
    = Usuario.discriminator('professor', professorSchema);
