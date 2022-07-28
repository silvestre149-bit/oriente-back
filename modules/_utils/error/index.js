import { ERRO_MESSAGE, HTTP_STATUS } from "../types/index.js";

export function setErro(msg, code, rest) {
    throw { error: true, msg, code, rest }
}

export function eVariavelValida(variavel) {
    if (typeof variavel === 'object' && Object.keys(variavel).length === 0
        || Array.isArray(variavel) && variavel.length === 0) { return false }
    return true;
}

/**
  * @param {import("express").Response} res 
  * @param {string} msg Mensagem de erro
  * @param {number} code 
  */
export default function erroHandler(res, msg, code) {
    switch (code) {
        case HTTP_STATUS.BAD_REQUEST:
            return res
                .status(HTTP_STATUS.BAD_REQUEST)
                .json({ msg: msg })
        case HTTP_STATUS.UNAUTHORIZED:
            return res
                .status(HTTP_STATUS.UNAUTHORIZED)
                .json({ msg: msg })
        case HTTP_STATUS.NOT_FOUND:
            return res
                .status(HTTP_STATUS.NOT_FOUND)
                .json({ msg: msg })
        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
            return res
                .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json({ msg: msg })

        default:
            return msg
                ? res
                    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                    .send({ msg })
                : res
                    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                    .send({ msg: ERRO_MESSAGE.INTERNAL_SERVER_ERROR })
    }
}