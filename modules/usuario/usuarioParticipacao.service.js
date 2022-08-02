import usuarioService from "./usuario.service.js"
import { HTTP_STATUS } from "../_utils/types/index.js"
import semestreService from "../semestre/semestre.service.js"
import { eVariavelValida, setErro } from "../_utils/error/index.js"
import participacaoService from "../participacao/participacao.service.js"
import { removerparticipacoes, validarCadastroParticipacoes, validarRemocaoParticipacoes } from "./usuario.utils.js"
import { Aluno } from "./entities/aluno.entity.js"

export default class UsuarioParticipacaoService {

    static async adicionarParticipacao(id, participacoes) {
        if (!eVariavelValida(participacoes)) { return [] }

        const filtros = { participacoes: true }
        const participacaoETipoArray = Array.isArray(participacoes);

        return Promise
            .all([
                semestreService.buscarSemestreAtivo(),
                usuarioService.buscarUm(participacoes.usuarioId, filtros),
                participacaoService.buscarMuitos(participacoes)
            ])
            .then(([semestre, usuario, participacoesObj]) => {
                if (participacoesObj.length === 0) {
                    return setErro('Nenhuma participação encontrada', HTTP_STATUS.NOT_FOUND)
                }
                if (participacaoETipoArray && (participacoesObj.length !== participacoes.length)) {
                    return setErro('Existe participação inválida')
                }

                const semestreAtualId = semestre[0]['_id'].toString();
                const participacoesCadastradas = usuario.participacoes;

                const participacaoValida = validarCadastroParticipacoes(semestreAtualId, usuario, participacoesCadastradas, participacoesObj)

                if (participacaoValida.erro) {
                    return setErro(participacaoValida.msg, HTTP_STATUS.BAD_REQUEST)
                }

                if (participacaoETipoArray) {
                    const novasParticipacoes = [...participacoesCadastradas, ...participacoes]
                    return usuarioService.atualizar(participacoes.usuarioId, { participacoes: novasParticipacoes })
                }

                participacoesCadastradas.push(participacoes);

                return usuarioService.atualizar(participacoes.usuarioId, { "tipo": participacoes.tipo, $push: { participacoes: participacoesCadastradas }})
            })
    }

    static async removerParticipacao(id, participacoes) {
        if (!eVariavelValida(participacoes)) { return [] }

        const filtros = { participacoes: true }

        return Promise
            .all([
                usuarioService.buscarUm(id, filtros),
                participacaoService.buscarMuitos(participacoes)
            ])
            .then(([usuario, participacoesObj]) => {
                const participacoesCadastradas = usuario.participacoes;
                const participacaoValida =
                    validarRemocaoParticipacoes(usuario, participacoes);

                if (participacaoValida.erro) {
                    return setErro(participacaoValida.msg, HTTP_STATUS.BAD_REQUEST)
                }
                if (Array.isArray(participacoesObj)) {
                    const casoNaoTemParticipacao = participacoesObj.length === 0;
                    const casoNaoAchouParticipacao = Array.isArray(participacoes)
                        ? participacoesObj.length !== participacoes.length
                        : undefined

                    if (casoNaoTemParticipacao) {
                        return setErro('Participações não enviadas ou não existente', HTTP_STATUS.BAD_REQUEST)
                    }
                    if (casoNaoAchouParticipacao) {
                        return setErro('Existe participação não encontrada', HTTP_STATUS.BAD_REQUEST)
                    }
                }

                const novasParticipacoes = removerparticipacoes(participacoesCadastradas, participacoesObj)
                return usuarioService.atualizar(id, { tipo: 'aluno', participacoes: novasParticipacoes })
            })
            .then(usuario => {
                return participacaoService.deletar(participacoes[0]);
            })
    }

}
