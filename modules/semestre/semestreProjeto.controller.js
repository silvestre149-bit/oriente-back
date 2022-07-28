import erroHandler from "../_utils/error/index.js";
import semestreService from "./semestre.service.js";


/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
 export async function buscarProjetosDeSemestre(req, res) {
    const { id } = req.params;

    return semestreService.buscarProjetosDeSemestre(id)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

 export async function addProjeto(req, res) {
    const { id } = req.params;
    const { body } = req;

    return semestreService.addProjeto(id, body)
        .then(data => res.json(data))
        .catch(({ msg, code }) => erroHandler(res, msg, code))
}

