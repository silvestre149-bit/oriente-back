import erroHandler from "../_utils/error/index.js";
import { buscarFiltros } from "../_utils/filtro.js";
import semestreService from "./semestre.service.js";
import { ATRIBUTOS_SEMESTRE } from "./semestre.utils.js";

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

export async function buscarUm(req, res) {
    const { id } = req.params;
    return semestreService.buscarUm(id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function buscarTodos(req, res) {
    const filtros = buscarFiltros(req, ATRIBUTOS_SEMESTRE)
    return semestreService.buscarTodos(filtros)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function buscarTurmas(req, res) {
    const { id } = req.params;
    return semestreService.buscarTurmas(id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function buscarSemestreAtivo(req, res) {

    return semestreService.buscarSemestreAtivo()
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function criar(req, res) {
    const { body } = req;
    return semestreService.criar(body)
        .then(data => res.json(data))
        .catch((error) => console.log(error))
}

export async function adicionarTurmas(req, res) {
    const { id } = req.params;
    const { body } = req;
    return semestreService.adicionarTurmas(id, body)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function atualizar(req, res) {
    const { id } = req.params;
    const { body } = req;
    return semestreService.atualizar(id, body)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function deletar(req, res) {
    const { id } = req.params;
    return semestreService.deletar(id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function fechar(req, res) {
    const { id } = req.params;
    return semestreService.fechar(id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}