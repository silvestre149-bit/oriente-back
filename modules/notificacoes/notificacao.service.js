import { Notificacao } from './entities/notificacao.entity.js';

export default class NotificacaoService {

    static async buscarUm(id) {
        return Notificacao.find({ destinatario: id }).lean();
    }

    static async buscarUmPedidoAberto(id) {
        return Notificacao.find({ remetente: id, tipo: 'cancelamento'}).lean();
    }

    static async buscarConvitesDeAlunosAbertos(id) {
        return Notificacao.find({ projetoId: id, tipo: 'participacao'}).lean();
    }

    static async buscarTodas(filtros) {
        return filtros
            ? Notificacao.find(filtros).populate({ select: ['_id', 'destinatario', 'remetenteCod', 'remetenteNome', 'status'] }).lean()
            : Notificacao.find().lean();
    }

    static async criar(body) {
        return await Notificacao.create(body)
    }

    static async enviarConvitesParticipantes(ids, dados) {
        
        async function enviarConvites() {
            Object.keys(ids).forEach(async (id) => {

                if (id.slice(0, 12) === "participante") {
                    dados["destinatario"] = ids[id];
                    dados["tipo"] = "participacao";
                    return await Notificacao.create({ ...dados })
                }
                if (id === "orientador") {
                    dados["destinatario"] = ids[id];
                    dados["tipo"] = "orientacao";
                    return await Notificacao.create({ ...dados })
                }
                if (id === "avaliador") {
                    dados["destinatario"] = ids[id];
                    dados["tipo"] = "avaliacao";
                    return await Notificacao.create({ ...dados })
                }
                if (id === "suplente") {
                    dados["destinatario"] = ids[id];
                    dados["tipo"] = "suplente";
                    return await Notificacao.create({ ...dados })
                }
            })
        };

        return await enviarConvites();
    }

    static async deletar(id) {
        return this.buscarUm()
            .then(() => {
                return Notificacao.findByIdAndRemove(id).lean()
            })
    }

    static async deletarTodas() {
        return Notificacao.deleteMany().lean(); 
    }
    
    static async deletarVarias(id) {
        return Notificacao.deleteMany({ projetoId: id}).lean(); 
    }
}
