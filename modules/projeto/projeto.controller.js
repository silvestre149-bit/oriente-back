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

export async function buscarProjetosProfessor(req, res) {
    const { id } = req.params;
    return projetoService.buscarProjetosProfessor(id)
        .then(data => res.json(data))
        .catch((error) => console.log(error))
}


export async function buscarOrientadorNoProjeto(req, res) {
    const { id } = req.params;

    return projetoService.buscarOrientadorNoProjeto(id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => console.log("Erro na busca."))
}

export async function buscarOrientadorStatus(req, res) {
    const { id } = req.params;

    return projetoService.buscarOrientadorStatus(id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => console.log("Erro na busca."))
}

export async function buscarAvaliadorNoProjeto(req, res) {
    const { id } = req.params;

    return projetoService.buscarAvaliadorNoProjeto(id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => console.log("Erro na busca."))
}

export async function buscarSuplenteNoProjeto(req, res) {
    const { id } = req.params;
    return projetoService.buscarSuplenteNoProjeto(id)
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

export async function aceitarAvaliador(req, res) {
    const { id } = req.params;

    return projetoService.aceitarAvaliador(id)
        .then(data => res.json(data))
}

export async function aceitarSuplente(req, res) {
    const { id } = req.params;

    return projetoService.aceitarSuplente(id)
        .then(data => res.json(data))
}

export async function adicionarCronograma(req, res) {
    const { id } = req.params;
    const { body } = req;

    return projetoService.adicionarCronograma(id, body)
        .then(data => res.json(data))
}

export async function removerAluno(req, res) {
    const { id } = req.params;
    const { body } = req;

    return projetoService.removerAluno(id, body)
        .then(data => res.json(data))
}

export async function removerOrientador(req, res) {
    const { id } = req.params;

    return projetoService.removerOrientador(id)
        .then(data => res.json(data))
}

export async function removerAvaliador(req, res) {
    const { id } = req.params;

    return projetoService.removerAvaliador(id)
        .then(data => res.json(data))
}

export async function removerSuplente(req, res) {
    const { id } = req.params;

    return projetoService.removerSuplente(id)
        .then(data => res.json(data))
}

export async function deletar(req, res) {
    const { id } = req.params;
    return projetoService.deletar(id)
        .then(data => res.json(data))
        .catch((error) => console.log(error))
}

 export async function deletarTodos(req, res) {
    const { id } = req.params;
    return projetoService.deletarTodos(id)
        .then(data => res.json(data))
        .catch((error) => console.log(error))
}