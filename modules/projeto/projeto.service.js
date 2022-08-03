import participacaoService from '../participacao/participacao.service.js';
import { setErro } from '../_utils/error/index.js';
import { HTTP_STATUS } from '../_utils/types/index.js';
import { Projeto } from './entities/projeto.entity.js';
import { Aluno } from '../usuario/entities/aluno.entity.js';
import { filtrarParticipantes } from './projeto.utils.js';
import { Usuario } from '../usuario/entities/usuario.entity.js';

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

    static async buscarProjetosProfessor(id) {
        const projetos = await Projeto.find().lean();

        const listaDeProjetos = projetos.filter((projeto) => {
            return projeto.participantes.find(participante => participante.usuarioId === id && participante.status === 'aceito');
        })
        
        return listaDeProjetos;
    };

    static async buscarOrientadorNoProjeto(id) {
        const projeto = await Projeto.findById(id).lean();

        const res = projeto.participantes.find(
            participante => participante.tipo === 'orientador'
        );
        
        if(!res) return undefined;

        return res;
    };

    static async buscarOrientadorStatus(id) {
        const projeto = await Projeto.findById(id).lean();

        const orientador = projeto.participantes.find(
            participante => participante.tipo === 'orientador' && participante.status === 'aceito'
        );
        
        if(!orientador) return undefined;

        return orientador;
    };

    static async buscarAvaliadorNoProjeto(id) {
        const projeto = await Projeto.findById(id).lean();

        const res = projeto.participantes.find(
            participante => participante.tipo === 'avaliador'
        );
        
        if(!res) return undefined;

        return res;
    };

    static async buscarSuplenteNoProjeto(id) {
        const projeto = await Projeto.findById(id).lean();

        const res = projeto.participantes.find(
            participante => participante.tipo === 'suplente'
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
        return Projeto.findByIdAndUpdate(id, { $push: { participantes: body }}).lean();
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

    static async aceitarAvaliador(id) {
        const projeto = await Projeto.findById(id).lean();
        const avaliador = projeto.participantes.find(avaliador => avaliador.tipo === 'avaliador');
        avaliador['status'] = 'aceito';
        return Projeto.findByIdAndUpdate(id, { $set: { participantes: projeto.participantes } }, { new: true }).lean();
    };

    static async aceitarSuplente(id) {
        const projeto = await Projeto.findById(id).lean();
        const suplente = projeto.participantes.find(suplente => suplente.tipo === 'suplente');
        suplente['status'] = 'aceito';
        return Projeto.findByIdAndUpdate(id, { $set: { participantes: projeto.participantes } }, { new: true }).lean();
    };

    static async removerAluno(id, body) {
        const projeto = await Projeto.findById(id).lean();
        const participantes = projeto.participantes.filter(participante => participante.tipo !== 'aluno' && participante.usuarioId !== body.id);
        return Projeto.findByIdAndUpdate(id, { $set: { participantes: participantes } }, { new: true }).lean();
    };

    static async removerOrientador(id) {
        const projeto = await Projeto.findById(id).lean();
        const participantes = projeto.participantes.filter(participante => participante.tipo !== 'orientador');
        return Projeto.findByIdAndUpdate(id, { $set: { participantes: participantes } }, { new: true }).lean();
    };

    static async removerAvaliador(id) {
        const projeto = await Projeto.findById(id).lean();
        const participantes = projeto.participantes.filter(participante => participante.tipo !== 'avaliador');
        return Projeto.findByIdAndUpdate(id, { $set: { participantes: participantes } }, { new: true }).lean();
    };

    static async removerSuplente(id) {
        const projeto = await Projeto.findById(id).lean();
        const participantes = projeto.participantes.filter(participante => participante.tipo !== 'suplente');
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

    static async deletarTodos(id) {
        return Projeto.deleteMany({ semestre: id }).lean();
    }
}