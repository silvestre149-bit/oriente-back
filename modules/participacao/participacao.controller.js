import erroHandler from '../_utils/error/index.js';
import participacaoService from './participacao.service.js';
import { buscarFiltros } from "../_utils/filtro.js";
import { ATRIBUTOS_PARTICIPACAO } from './participacao.utils.js';

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export async function buscarUm(req, res) {
    const { id } = req.params;
    return participacaoService.buscarUm(id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function buscarParticipacoesDeProjeto(req, res) {
    const { id } = req.params;
    return participacaoService.buscarParticipacoesDeProjeto(id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function buscarTodos(req, res) {
    const filtros = buscarFiltros(req, ATRIBUTOS_PARTICIPACAO)
    return participacaoService.buscarTodos(filtros)
        .then(data => res.json(data))
}

 export async function inserirParticipacao(req, res) {
    const { id } = req.params;
    const { body } = req;
    return participacaoService.inserirParticipacao(id, body)
        .then(data => res.json(data))
}

export async function criar(req, res) {
    const { body } = req;
    return participacaoService.criar(body)
        .then(data => res.json(data));
}

export async function atualizar(req, res) {
    const { id } = req.params;
    const { body } = req;

    return participacaoService.atualizar(id, body)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function deletar(req, res) {
    const { id } = req.params;
    return participacaoService.deletar(id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function deletarPartici(req, res) {
    const { id } = req.params;
    const { body } = req;
    return participacaoService.deletarUmaParticipacao(id, body)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}