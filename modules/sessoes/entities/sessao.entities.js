import mongoose from 'mongoose';

const SessaoSchema = new mongoose.Schema({

    titulo: { 
        type: String
    },
    posters: {
        type: Number
    },
    posterscad: {
        type: Number,
        default: 0
    },
    situacao: {
        type: String
    },
    localapresentacao: {
        type: String
    },
    data: {
        type: Date
    },
    disponivel: {
        type: Boolean,
        default: true
    }

})

const Sessao = mongoose.model('sessao', SessaoSchema);
export default Sessao;