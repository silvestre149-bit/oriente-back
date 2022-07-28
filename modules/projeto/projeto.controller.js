import { buscarFiltros } from "../_utils/filtro.js";
import projetoService from "./projeto.service.js";
import { ATRIBUTOS_PROJETO } from "./projeto.utils.js";

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export async function buscarUm(req, res) {
    const { id } = req.params;
    return projetoService.buscarUm(id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => console.log("Erro na busca."))
}

export async function buscarTodos(req, res) {
    const filtros = buscarFiltros(req, ATRIBUTOS_PROJETO);
    return projetoService.buscarTodos(filtros)
        .then(data => res.json(data))
}

export async function buscarUmProjetoAluno(req, res) {
    const { id } = req.params;
    return projetoService.buscarUmProjetoAluno(id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => console.log("Erro na busca."))
}

export async function buscarCoordenadorNoProjeto(req, res) {
    const { id } = req.params;
    return projetoService.buscarCoordenadorNoProjeto(id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => console.log("Erro na busca."))
}

export async function criar(req, res) {
    const { body } = req;
    return projetoService.criar(body)
        .then(data => res.json(data));
}

export async function registrarProjeto(req, res) {
    const { id } = req;
    const { idProjeto } = req;
    return projetoService.cadastrarAlunoProjeto(id, idProjeto)
        .then(data => res.json(data));
}

 export async function inserirParticipante(req, res) {
    const { id } = req.params;
    const { body } = req;
    return projetoService.inserirParticipante(id, body)
        .then(data => res.json(data))
}

export async function atualizar(req, res) {
    const { id } = req.params;
    const { body } = req;

    return projetoService.atualizar(id, body)
        .then(data => res.json(data))
}

export async function aceitarOrientador(req, res) {
    const { id } = req.params;

    return projetoService.aceitarOrientador(id)
        .then(data => res.json(data))
}

export async function adicionarCronograma(req, res) {
    const { id } = req.params;
    const { body } = req;

    return projetoService.adicionarCronograma(id, body)
        .then(data => res.json(data))
}

export async function removerOrientador(req, res) {
    const { id } = req.params;

    return projetoService.removerOrientador(id)
        .then(data => res.json(data))
}

export async function deletar(req, res) {
    const { id } = req.params;
    return projetoService.deletar(id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

 export async function deletarTodos(req, res) {
    return projetoService.deletarTodos()
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}