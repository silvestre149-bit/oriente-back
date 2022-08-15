import mongoose from 'mongoose';

const SessaoSchema = new mongoose.Schema({
    titulo: { 
        type: String
    },
    local: {
        type: String
    },
    data: {
        type: String
    },
    horario: {
        type: String
    },
    semestre: {
        type: String
    },
    quantidade: {
        type: Number
    },
    situacao: {
        type: ['aberto', 'fechado'],
        default: 'aberto'
    },
})

const Sessao = mongoose.model('sessao', SessaoSchema);
export default Sessao;