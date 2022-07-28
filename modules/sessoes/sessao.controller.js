import erroHandler from '../_utils/error/index.js';
import SessaoService from './sessao.service.js';

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

export async function buscarUm(req, res) {
    SessaoService.buscarUm(req.params.id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function buscarTodos(req, res) {
    const { tipo } = req.query
    return SessaoService.buscarTodos(tipo)
        .then(data => res.json(data));
}

export async function criar(req, res) {
    const { body } = req;

    return SessaoService.criar(body)
        .then(data => res.json(data))
        .catch (({ msg, code }) => erroHandler(res, msg, code))
}

export async function criarMuitos(req, res) {
    const { body } = req;

    return SessaoService.criarMuitos(body)
        .then(data => res.json(data))
        .catch (({ msg, code }) => erroHandler(res, msg, code))
}

export async function atualizar(req, res) {
    const { id } = req.params;
    const { body } = req;

    return SessaoService.atualizar(id, body)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function deletar(req, res) {
    return SessaoService.deletar(req.params.id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function deletarTodos(req, res) {
    return SessaoService.deletarTodos()
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}