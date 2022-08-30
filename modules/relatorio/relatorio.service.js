import { Relatorio } from './entities/relatorio.entity.js';

export default class RelatorioService {

    static async buscarTodos(filtros) {
        return filtros
            ? Relatorio.find(filtros).lean()
            : Relatorio.find().lean();
    };

    static async criar(body) {
        return Relatorio.create(body)
    };

    static async deletarTodos(id) {
        return Relatorio.deleteMany({ semestre: id }).lean();
    }
}