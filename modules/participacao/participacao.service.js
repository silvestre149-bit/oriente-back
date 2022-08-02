import semestreService from "../semestre/semestre.service.js";
import { setErro } from "../_utils/error/index.js";
import { HTTP_STATUS } from "../_utils/types/index.js";
import { Participacao } from "./entities/participacao.entity.js";
import { Usuario } from '../usuario/entities/usuario.entity.js';

export default class ParticipacaoService {

    static async buscarMuitos(ids) {
        return Participacao.find({ '_id': { $in: ids } }).lean();
    }

    static async buscarTodos(filtros) {
        return filtros
            ? Participacao.find(filtros).populate({ path: 'usuarioId', select: ['_id', 'nome', 'turmas', 'cod', 'tipo'] }).lean()
            : Participacao.find().lean();
    }

    static async buscarUm(id) {
        const participacao = await Participacao.findById(id).lean();
        if (!participacao) {
            return setErro('Participação não encontrada', HTTP_STATUS.NOT_FOUND)
        }
        return participacao;
    }

    static async buscarUmParticipacoesDeProjeto(id) {
        const participacao = await Participacao.find({ "projetoId": id}).lean();
        if (!participacao) {
            return setErro('Participação não encontrada', HTTP_STATUS.NOT_FOUND)
        }
        return participacao;
    }

    static async criar(body) {
        return semestreService
            .buscarSemestreAtivo()
            .then(semestreAtivo => {
                const semestreId = semestreAtivo[0]['_id'].toString()
                return Participacao.create({ ...body, semestreId });
            })
    }

    static async inserirParticipacao(id, participacaoID) {
        return Participacao.findByIdAndUpdate(id, { $push: { participacoes: participacaoID.participacoes } });
    }

    static async deletarUmaParticipacao(id) {
        return Usuario.findOneAndUpdate(id, { $pull: { participacoes: id } });
    }

    static async atualizar(id, body) {
        return this.buscarUm(id)
            .then(() => {
                return Participacao.findByIdAndUpdate(id, body, { new: true })
            })
    }
    
    static async deletar(ids) {
        if (Array.isArray(ids)) {
            return this.buscarMuitos(ids)
                .then(participacoes => {
                    if (participacoes.length !== ids.length) {
                        return setErro('Existe participações não existentes', HTTP_STATUS.BAD_REQUEST)
                    }

                    return Participacao.deleteMany({ '_id': { $in: ids } })
                })
                .then(deletados => {
                    return { deletados: deletados.deletedCount }
                })
        }
        return this.buscarUm(ids)
            .then(() => {
                return Participacao.findByIdAndRemove(ids)
            })
    }
}