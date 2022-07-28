import JwtService from "../auth/jwt.service.js";
import { acrescentarVirgula } from "../_utils/string.js";

function validarCasoTipoDiferente(tipoUsuario, participacoesNovas) {
    let casoTipoDiferente = false;

    for (const participacaoNova of participacoesNovas) {
        if (participacaoNova.tipo !== tipoUsuario) {
            casoTipoDiferente = true;
        }
    }
    return casoTipoDiferente
}

function validarCasoSemestreDiferente(semestreAtualId, participacoesNovas) {
    let casoSemestreDiferente = false;

    for (const participacaoNova of participacoesNovas) {
        if (participacaoNova['semestreId'].toString() !== semestreAtualId) {
            casoSemestreDiferente = true;
        }
    }

    return casoSemestreDiferente;
}

function validarCasoRepetido(participacoesCadastradas, participacoesNovas) {
    let casoRepetido = false;

    for (const participacaoAntiga of participacoesCadastradas) {
        for (const participacaoNova of participacoesNovas) {
            if (participacaoAntiga['_id'].toString() === participacaoNova['_id'].toString()) {
                casoRepetido = true
            }
        }
    }
    return casoRepetido
}

function validarCasoAlunoMuitasParticipacoes(semestreAtualId, participacoesCadastradas) {
    let casoAlunoMuitasParticipacoes = false;

    for (const participacaoAntiga of participacoesCadastradas) {
        if (participacaoAntiga['semestreId'].toString() === semestreAtualId) {
            casoAlunoMuitasParticipacoes = true;
        }
    }

    return casoAlunoMuitasParticipacoes;
}

function validarCasoProfessorSemPermissao(professor) {
    const professorPodeAvaliar = professor.permissoes.orientador !== true;
    return professorPodeAvaliar;
}

function definirMensagemErro(resposta, msg, virgula) {
    resposta.erro = true;
    if (virgula) {
        resposta.msg += acrescentarVirgula(resposta.msg) ? ', ' : '';
        resposta.msg += msg
    } else {
        resposta.msg = msg
    }
    return resposta;
}

export function validarCadastroParticipacoes(semestreAtualId, usuario, participacoesCadastradas, participacoesNovas) {
    let resposta = { erro: false, msg: "" }
    const tipoUsuario = usuario.tipo
    const comVirgula = true;
    let casoTipoDiferente, casoSemestreDiferente, casoRepetido, casoAlunoMuitasParticipacoes, casoProfessorSemPermissao;

    casoTipoDiferente = validarCasoTipoDiferente(tipoUsuario, participacoesNovas)
    casoSemestreDiferente = validarCasoSemestreDiferente(semestreAtualId, participacoesNovas)
    casoRepetido = validarCasoRepetido(participacoesCadastradas, participacoesNovas)

    if (tipoUsuario === 'aluno') {
        casoAlunoMuitasParticipacoes = validarCasoAlunoMuitasParticipacoes(semestreAtualId, participacoesCadastradas)
    } else {
        casoProfessorSemPermissao = validarCasoProfessorSemPermissao(usuario);
    }

    if (casoTipoDiferente) {
        resposta = definirMensagemErro(resposta, "Participação não compativel com o tipo de usuário")
    }
    if (casoSemestreDiferente) {
        resposta = definirMensagemErro(resposta, "semestres não compatíveis", comVirgula)
    }
    if (casoRepetido) {
        reposta = definirMensagemErro(resposta, "participação repetida", comVirgula)
    }

    if (tipoUsuario === 'aluno' && casoAlunoMuitasParticipacoes) {
        resposta = definirMensagemErro(resposta, "o aluno já está relacionado a uma participação de projeto", comVirgula)
    } else if (tipoUsuario === 'professor' && casoProfessorSemPermissao) {
        reposta = definirMensagemErro(resposta, "professor não tem permissão de avaliador", comVirgula)
    }

    return resposta;
}

function validarCasoParticipacaoNaoExiste(participacoesUsuario, participacoes) {
    let participacaoExiste = false, participacaoEncontrada = false;

    for (const participacaoUsuario of participacoesUsuario) {
        for (const participacao of participacoes) {
            participacaoEncontrada = participacao === participacaoUsuario['_id'].toString()
            if (participacaoEncontrada) {
                participacaoExiste = true;
                participacaoEncontrada = false;
            }
        }
        if (!participacaoExiste) {
            return true
        }
    }

    return false;
}

export function validarRemocaoParticipacoes(usuario, participacoes) {
    /* const comVirgula = true; */
    let resposta = { erro: false, msg: "" }
    const participacoesUsuario = usuario.participacoes;
    let casoParticipacaoNaoExiste;

    casoParticipacaoNaoExiste = validarCasoParticipacaoNaoExiste(participacoesUsuario, participacoes)

    if (casoParticipacaoNaoExiste) {
        resposta = definirMensagemErro(resposta, "Existe participação que não existe")
    }

    return resposta;
}

export function removerparticipacoes(participacoesCadastradas, participacoesParaRemover) {

    const eArray = Array.isArray(participacoesParaRemover);
    const remover = 1;

    if (!eArray) {
        for (const indice in participacoesCadastradas) {
            const achouParticipacao = participacoesParaRemover['_id'].toString() === participacoesCadastradas[indice]['_id'].toString()
            if (achouParticipacao) {
                participacoesCadastradas.splice(indice, remover)
            }
        }
        return participacoesCadastradas;
    }

    for (const indice in participacoesCadastradas) {
        for (const participacaoParaRemover of participacoesParaRemover) {
            const achouParticipacao
                = participacoesCadastradas[indice]['_id'].toString() === participacaoParaRemover['_id'].toString()

            if (achouParticipacao) {
                participacoesCadastradas.splice(indice, remover)
            }
        }
    }
    return participacoesCadastradas;
}

export function removerSenhaUsuarios(usuarios) {
    let usuariosSemSenha;
    if (Array.isArray(usuarios)) {
        usuariosSemSenha = usuarios.map(({ _id, cod, nome, tipo }) => { return { _id, cod, nome, tipo } })
    } else {
        const { _id, cod, nome, tipo } = usuario
        usuariosSemSenha = { _id, cod, nome, tipo };
    }
    return usuariosSemSenha;
}

export function filtrarUsuariosNovos(usuarios, usuariosCadastrados) {
    const usuariosNovos = [];
    let usuarioJafoiCadastrado = false;

    for (const usuario of usuarios) {
        for (const usuarioCadastrado of usuariosCadastrados) {
            if (usuario.cod === usuarioCadastrado.cod) {
                usuarioJafoiCadastrado = true;
            }
        }
        if (!usuarioJafoiCadastrado) {
            usuario.senha = JwtService.gerarHash(usuario.cod);
            usuariosNovos.push(usuario)
        }
        usuarioJafoiCadastrado = false;
    }
    return usuariosNovos;
}

export const ATRIBUTOS_USUARIO =
    [
        'nome',
        'cod',
        'permissoes'
    ]