import relatorioService from "./relatorio.service.js";

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export async function buscarTodos(req, res) {
    return relatorioService.buscarTodos()
        .then(data => res.json(data))
        .catch((error) => console.log(error))
}

export async function criar(req, res) {
    const { body } = req;
    return relatorioService.criar(body)
        .then(data => res.json(data))
        .catch((error) => console.log(error))
}

 export async function deletarTodos(req, res) {
    const { id } = req.params;
    return relatorioService.deletarTodos(id)
        .then(data => res.json(data))
        .catch((error) => console.log(error))
}