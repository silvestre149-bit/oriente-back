import erroHandler from "../_utils/error/index.js";
import usuarioParticipacaoService from "./usuarioParticipacao.service.js";

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export async function adicionarParticipacao(req, res) {
    const { id } = req.params;
    const { body } = req;

    return usuarioParticipacaoService.adicionarParticipacao(id, body.data)
        .then(data => res.json(data))
        .catch((error) => console.log(error))
}

export async function removerParticipacao(req, res) {
    const { id } = req.params;
    const { body } = req;

    return usuarioParticipacaoService.removerParticipacao(id, body)
        .then(data => res.json(data))
        .catch((error) => console.log(error))
}