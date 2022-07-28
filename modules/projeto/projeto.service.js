import participacaoService from '../participacao/participacao.service.js';
import { setErro } from '../_utils/error/index.js';
import { HTTP_STATUS } from '../_utils/types/index.js';
import { Projeto } from './entities/projeto.entity.js';
import { Aluno } from '../usuario/entities/aluno.entity.js';
import { filtrarParticipantes } from './projeto.utils.js';

export default class ProjetoService {

    static async buscarTodos(filtros) {
        return filtros
            ? Projeto.find(filtros).lean()
            : Projeto.find().lean();
    };

    static async buscarUm(id) {
        const projeto = await Projeto.findById(id).lean();
        if (!projeto) {
            return setErro('Projeto não encontrado', HTTP_STATUS.NOT_FOUND);
        }
        const participacoesDoProjeto = await participacaoService.buscarTodos({ projetoId: id });
        const participantes = filtrarParticipantes(participacoesDoProjeto);

        return { ...projeto, participantes };
    };

    static async buscarUmProjetoAluno(id) {

        const aluno = await Aluno.findById(id).lean();

        if(!aluno) return setErro('Aluno não encontrado', HTTP_STATUS.NOT_FOUND);

        const participacao = await participacaoService.buscarUm(aluno.participacoes[0]._id);

        const projeto = await Projeto.findById(participacao.projetoId).lean();
        
        return projeto;
    };

    static async buscarCoordenadorNoProjeto(id) {
        const projeto = await Projeto.findById(id).lean();

        const res = projeto.participantes.find(
            participante => participante.tipo === 'orientador'
            );
        
        if(!res) return undefined;

        return res;
    };

    static async criar(body) {
        return Projeto.create(body)
    };

    static async cadastrarAlunoProjeto(id, projetoID) {
        return Aluno.findByIdAndUpdate(id, { participacoes: projetoID });
    };

    static async inserirParticipante(id, body) {
        return Projeto.findByIdAndUpdate(id, { $push: { participantes: body.data } });
    };

    static async atualizar(id, body) {
        return this.buscarUm(id)
            .then(() => {
                return Projeto.findByIdAndUpdate(id, body, { new: true }).lean()
            })
    };

    static async aceitarOrientador(id) {
        const projeto = await Projeto.findById(id).lean();
        const orientador = projeto.participantes.find(orientador => orientador.tipo === 'orientador');
        orientador['status'] = 'aceito';
        return Projeto.findByIdAndUpdate(id, { $set: { participantes: projeto.participantes } }, { new: true }).lean();
    };

    static async removerOrientador(id) {
        const projeto = await Projeto.findById(id).lean();
        const participantes = projeto.participantes.filter(participante => participante.tipo !== 'orientador');
        return Projeto.findByIdAndUpdate(id, { $set: { participantes: participantes } }, { new: true }).lean();
    };

    static async adicionarCronograma(id, body) {
        return await Projeto.findByIdAndUpdate(id, { cronogramaDeOrientacao: body }).lean();
    };
    
    static async deletar(id) {
        return this.buscarUm(id)
            .then(() => {
                return Projeto.findByIdAndRemove(id);
            })
    }

    static async deletarTodos() {
        return Projeto.deleteMany({}).lean();
    }
}