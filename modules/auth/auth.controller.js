import { HTTP_STATUS } from "../_utils/types/index.js";

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export async function login(req, res) {
    res.status(HTTP_STATUS.OK).json(req.user);
}