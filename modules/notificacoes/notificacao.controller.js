import { buscarFiltros } from "../_utils/filtro.js";
import notificacaoService from "./notificacao.service.js";
import { ATRIBUTOS_NOTIFICACAO } from "./notificacao.utils.js";

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export async function buscarNotificacoes(req, res) {
    const { id } = req.params;
    return notificacaoService.buscarUm(id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function buscarPedidoAberto(req, res) {
    const { id } = req.params;
    return notificacaoService.buscarUmPedidoAberto(id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function buscarConvitesDeAlunosAbertos(req, res) {
    const { id } = req.params;
    return notificacaoService.buscarConvitesDeAlunosAbertos(id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function buscarTodas(req, res) {
    const filtros = buscarFiltros(req, ATRIBUTOS_NOTIFICACAO)
    return notificacaoService.buscarTodas(filtros)
        .then(data => res.json(data))
}

export async function criar(req, res) {
    const { body } = req;
    return notificacaoService.criar(body)
        .then(data => res.json(data));
}

export async function enviarConvitesParticipantes(req, res) {
    const { ids, dados } = req.body;
    return await notificacaoService.enviarConvitesParticipantes(ids, dados)
        .then(data => res.json(data));
}

export async function deletar(req, res) {
    const { id } = req.params;
    return notificacaoService.deletar(id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => console.log("Erro na busca."))
}

export async function deletarTodas(req, res) {
    const { id } = req.params;
    return notificacaoService.deletarTodas(id)
        .then(data => res.json(data))
        .catch((error) => console.log(error))
}

export async function deletarVarias(req, res) {
    const { id } = req.params;
    return notificacaoService.deletarVarias(id)
        .then(data => res.json(data))
        .catch((error) => console.log(error))
}