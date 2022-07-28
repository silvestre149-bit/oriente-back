
import pkg from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { verify, sign } = jwt;

const { genSaltSync, hashSync, compareSync } = pkg

const SECRET_KEY = process.env.JWT_SECRET || 'teste';
const TIME_TOKEN = process.env.JWT_TIME_TOKEN || "20m";


export default class JwtService {
    static compararHash(compare, hash) {
        return compareSync(compare, hash);
    }

    static gerarHash(password) {
        let salt = genSaltSync(10);
        password = hashSync(password, salt);
        return (password);
    }

    /**
 * @description gera um jwt token
 * @param {int} timeToken valor em minutos da duração do token
 */
    static criarToken(body, duracao) {
        let tokenParam, token;
        if (duracao) {
            duracao = duracao + "m";
            tokenParam = { expiresIn: duracao };
        } else {
            tokenParam = { expiresIn: TIME_TOKEN };
        }
        token = sign(body, SECRET_KEY, tokenParam);
        return token;
    }

    validarToken(token) {
        try {
            return verify(token, SECRET_KEY)
        } catch (error) {
            return 'isInvalidToken';
        }
    }
}