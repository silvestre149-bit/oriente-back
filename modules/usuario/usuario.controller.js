import erroHandler from '../_utils/error/index.js';
import UsuarioService from './usuario.service.js';

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export async function buscarUm(req, res) {
    UsuarioService.buscarUm(req.params.id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function buscarCod(req, res) {
    UsuarioService.buscarCod(req.params.cod)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function buscarTodos(req, res) {
    const { tipo } = req.query
    return UsuarioService.buscarTodos(tipo)
        .then(data => res.json(data));
}

export async function buscarProfessores(req, res) {
    return UsuarioService.buscarProfessores()
        .then(data => res.json(data))
        .catch((error) => { return console.log(error) })
}

export async function buscarAlunos(req, res) {
    return UsuarioService.buscarAlunos()
        .then(data => res.json(data))
        .catch((error) => { return console.log(error) })
}

export async function criar(req, res) {
    const { body } = req;

    return UsuarioService.criar(body)
        .then(data => res.json(data))
        .catch((error) => console.log(error))
}

export async function criarMuitos(req, res) {
    const { body } = req;

    return UsuarioService.criarMuitos(body)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function deletar(req, res) {
    return UsuarioService.deletar(req.params.id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function deletarTodos(req, res) {
    return UsuarioService.deletarTodos()
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function deletarTodosProf(req, res) {
    return UsuarioService.deletarTodosProf()
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function deletarTodosAlunos(req, res) {
    return UsuarioService.deletarTodosAlunos()
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

export async function atualizar(req, res) {
    const { id } = req.params;
    const { body } = req;

    return UsuarioService.atualizar(id, body)
        .then(data => res.json(data))
}

export async function atualizarAluno(req, res) {
    const { id } = req.params;
    const { turmaOne } = req.body.turmaUm;
    const { turmaTwo } = req.body.turmaDois;

    return UsuarioService.editarAluno(id, turmaOne, turmaTwo)
        .then(data => res.json(data))
}