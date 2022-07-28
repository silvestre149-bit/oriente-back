import { setErro } from '../_utils/error/index.js';
import { HTTP_STATUS } from '../_utils/types/index.js';
import Sessao from './entities/sessao.entities.js';

export default class SemestreService {

    static async buscarTodos(filtros) {
        return filtros
            ? Sessao.find(filtros).lean()
            : Sessao.find().lean();
    }

    static async buscarUm(id) {
        const sessao = await Sessao.findById(id);
        if (!sessao) {
            return setErro('Sessão não encontrada', HTTP_STATUS.NOT_FOUND)
        }
        return sessao
    }
    
    static async criar(body) {
        return Sessao.create(body);
    }
    
    static async atualizar(id, body) {
        return this.buscarUm(id)
            .then(() => {
                return Sessao.findOneAndUpdate(id, body, { new: true }).lean()
            })
    }

    static async deletar(id) {
        return this.buscarUm(id)
            .then(() => {
                return Sessao.findByIdAndRemove(id)
            })
    }
}