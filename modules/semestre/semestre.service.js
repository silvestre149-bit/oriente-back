import { setErro } from '../_utils/error/index.js';
import { HTTP_STATUS } from '../_utils/types/index.js';
import Semestre from './entities/semestre.entity.js';
import semestreProjeto from './semestreProjeto.service.js';

export default class SemestreService {

    static async buscarTodos(filtros) {
        return filtros ?
            Semestre.find(filtros).lean() :
            Semestre.find().lean();
    }

    static async buscarSemestreAtivo() {
        return await Semestre.find({ status: "aberto" }).lean()
    }

    static async criar(body) {
        const semestreAtivo = await this.buscarSemestreAtivo();
        if (semestreAtivo.length > 0) {
            return setErro('Já existe um semestre aberto', HTTP_STATUS.BAD_REQUEST)
        }
        if (!body['permissoes']) {
            body = {...body, permissoes: {} }
        }
        return Semestre.create(body);
    }
    static async buscarUm(id) {
        const semestre = await Semestre.findById(id);
        if (!semestre) {
            return setErro('Semestre não encontrado', HTTP_STATUS.NOT_FOUND)
        }
        return semestre
    }
    static async deletar(id) {
        return this.buscarUm(id)
            .then(() => {
                return Semestre.findByIdAndRemove(id)
            })

    }
    static async atualizar(id, body) {
        return this.buscarUm(id)
            .then(() => {
                return Semestre.findByIdAndUpdate(id, body, { new: true }).lean()
            })
    }

    static async fechar(id) {
        return this.buscarUm(id)
            .then(() => {
                return Semestre.findByIdAndUpdate(id, { status: "fechado" }, { new: true }).lean()
            })
    }

    static async adicionarTurmas(id, body) {
        return this.buscarUm(id, body)
            .then(() => {
                return Semestre.Update(id, { $push: { turmas: body } }, { new: true }).lean()
            })
    }

    static async addProjeto(id, projeto) {
        return this.buscarUm(id)
            .then(semestre => {
                const projetoExiste = semestreProjeto.checarProjetoExiste(projeto, semestre.projetos)
                if (projetoExiste) {
                    return setErro('Projeto já adicionado', HTTP_STATUS.BAD_REQUEST)
                }
                semestre.projetos.push(projeto);
                return Semestre.findByIdAndUpdate(id, semestre, { new: true }).lean()
            })
    }

    static async buscarProjetosDeSemestre(id) {
        return this.buscarUm(id)
            .then(() => {
                return Semestre.findById(id).populate('projetos').lean()
            })
            .then(semestre => {
                return semestre.projetos;
            })
    }

    static async buscarTurmas(id) {
        return this.buscarUm(id)
            .then(() => {
                return Semestre.findById(id).populate('turmas').lean()
            })
            .then(semestre => {
                return semestre.turmas;
            })
    }

}