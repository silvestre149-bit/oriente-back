import { setErro } from "../_utils/error/index.js";
import { HTTP_STATUS } from "../_utils/types/index.js";
import { Usuario } from "./entities/usuario.entity.js";
import { Aluno } from './entities/aluno.entity.js';
import { Professor } from "./entities/professor.entity.js";
import jwtService from '../auth/jwt.service.js';
import { filtrarUsuariosNovos, removerSenhaUsuarios } from "./usuario.utils.js";
import { Participacao } from "../participacao/entities/participacao.entity.js";
import ProjetoService from "../projeto/projeto.service.js";

export default class UsuarioService {

    static async buscarTodos(tipo) {
        if (tipo === "aluno") {
            return Usuario.find({ tipo: 'aluno' }).lean()
        } else if (tipo === "professor") {
            return Usuario.find({ tipo: 'professor' }).lean()
        }
        return Usuario.find().lean()
    }

    static async buscarUm(id, filtros) {

        let participacoes;

        if (filtros) {
            participacoes = filtros.participacoes;
        }

        const usuario = participacoes ?
            await Usuario.findById(id).populate('participacoes').lean() :
            await Usuario.findById(id).lean()
        
        if (!usuario) {
            return setErro('usuário não encontrado', 404)
        }
        return usuario;
    }

    static async buscarCod(cod) {
        try {
            return await Usuario.findOne({ "cod": cod });
        } catch(e) {
            return e;
        }
    }

    static async buscarAlunos() {
        try {
            return await Usuario.find({ tipo: "aluno" }).lean();
        } catch(Error) {
            return console.log(Error);
        }
    }

    static async buscarAlunosComProjetos() {
        try {
            const alunos = await Usuario.find({ tipo: "aluno" }).lean();
            const alunosComProjetos = await Promise.all(alunos.filter(aluno => {
                return aluno.participacoes.length > 0;
            }).map(async aluno => {
                const participacoes = await Promise.all(aluno.participacoes.map(async participacao => {
                    return await Participacao.findById(participacao).lean();
                }));

                const projetos = await Promise.all(participacoes.map(async participacao => {
                    return await ProjetoService.buscarUm(participacao.projetoId);
                }));

                return {...aluno, projetos};
            }));

            return alunosComProjetos;
        } catch(Error) {
            return console.log(Error);
        }
    }

    static async buscarProfessores() {
        try {
            return await Usuario.find({ "tipo": "professor" }).lean();
        } catch(Error) {
            return console.log(Error);
        }
    }

    static async criarMuitos(body) {
        let dados;
        if (body[0].tipo == "aluno") {
            const alunosCadastrados = await this.buscarTodos('aluno');
            const alunosNovos = filtrarUsuariosNovos(body, alunosCadastrados);
            if (alunosNovos.length === 0) { return [] }
            dados = await Aluno.insertMany(alunosNovos);
        } else {
            const professorCadastrados = await this.buscarTodos('professor')
            const professoresNovos = filtrarUsuariosNovos(body, professorCadastrados)
            if (professoresNovos.length === 0) { return [] }
            dados = await Professor.insertMany(professoresNovos);
        }

        return removerSenhaUsuarios(dados);
    }

    static async criarUm(body) {
        body.senha = jwtService.gerarHash(body.cod);
        if (body.tipo == "aluno") {
            return Aluno.create(body);
        } else {
            return Professor.create(body);
        }
    }

    static tratarErroAoCriar(erro) {
        if (erro.code) {
            return setErro('usuário já cadastrado', HTTP_STATUS.BAD_REQUEST)
        }
    }

    static async criar(body) {
        if (Array.isArray(body) === true) {
            return this.criarMuitos(body)
                .catch(err => this.tratarErroAoCriar(err))
        } else {
            return this.criarUm(body)
                .catch(err => this.tratarErroAoCriar(err))
        }
    }

    static async buscarPorCod(cod, trazerSenha) {
        const usuario = trazerSenha ?
            await Usuario.findOne({ cod }).select("+senha").lean() :
            await Usuario.findOne({ cod }).lean()

        if (!usuario) {
            return setErro('usuário não encontrado', HTTP_STATUS.NOT_FOUND)
        }
        return usuario;
    }

    static async deletar(id) {
        return this.buscarUm(id)
            .then(() => {
                return Usuario.findByIdAndRemove(id).lean()
            })
    }

    static async deletarTodos() {
        return Usuario.deleteMany({}).lean();
    }

    static async deletarTodosAlunos(id) {
        return Usuario.deleteMany({"tipo": "aluno", "semestre": id}).lean();
    }

    static async atualizar(id, body) {

        if(body.senha) {
            const gerarHash = jwtService.gerarHash(body.senha);
            body.senha = gerarHash;

            switch (body.tipo) {
                case "professor":
                    return Professor.findByIdAndUpdate(id, body, { new: true }).lean()
                    break;
                case "aluno":
                    return Aluno.findByIdAndUpdate(id, body, { new: true }).lean()
                    break;
            }
        }

        switch (body.tipo) {
            case "professor":
                return Professor.findByIdAndUpdate(id, body, { new: true }).lean()
                break;
            case "aluno":
                return Aluno.findByIdAndUpdate(id, body, { new: true }).lean()
                break;
        }
    }

    static async editarAluno(id, turmaOne, turmaTwo) {
        return this.buscarUm(id)
            .then(() => {
                return Usuario.findByIdAndUpdate(id, { $unset: { "turmas": [turmaOne, turmaTwo] } }).lean()
            })
    }

    static async inserirParticipacao(id, participacaoID) {
        return Usuario.findByIdAndUpdate(id, { $push: { participacoes: participacaoID.participacoes } });
    }
}