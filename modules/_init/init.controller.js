import { Professor } from '../usuario/entities/professor.entity.js'
import { Aluno } from '../usuario/entities/aluno.entity.js'
import jwtService from '../auth/jwt.service.js'

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export async function cadastrarCoordenador(req, res) {
    const primeiroUsuario = {
        nome: "coordenadorFirst",
        senha: jwtService.gerarHash("lfs123!@#"),
        cod: '123456',
        permissoes: {
            coordenador: true
        }
    }
    return Professor.create(primeiroUsuario)
    .then(data => res.json(data))
    .catch(err => {
        return err;
    });
}

export async function cadastrarProfessor(req, res) {
    const primeiroUsuario = {
        nome: "professorFirst",
        senha: jwtService.gerarHash("lfs123!@#"),
        cod: '456123',
        permissoes: {
            coordenador: false
        }
    }
    return Professor.create(primeiroUsuario)
    .then(data => res.json(data))
    .catch(err => {
        return err;
    });
}

export async function cadastrarAluno(req, res) {
    const terceiroAluno = {
        nome: "Mikael3",
        senha: jwtService.gerarHash("lfs123!@#"),
        cod: '456123',
    }
    return Aluno.create(terceiroAluno)
    .then(data => res.json(data))
    .catch(err => {
        return err;
    });
}