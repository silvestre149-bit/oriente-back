
import passport from "passport";
import LocalStrategy from "passport-local";
import usuarioService from '../usuario/usuario.service.js';
import jwtService from './jwt.service.js';

const localOpts = {
    usernameField: 'usuario',
    passwordField: 'senha'
};

const localStrategy = new LocalStrategy(localOpts, async (usuario, senha, done) => {
    try {
        const trazerSenha = true;
        let usuarioExiste = await usuarioService.buscarPorCod(usuario, trazerSenha)

        if (!usuarioExiste) {
            return done(null, false)
        } else if (!jwtService.compararHash(senha, usuarioExiste.senha)) {
            return done(null, false)
        } else if (usuarioExiste.senha == usuario) {
            throw Error('senha desprotegida'); //TODO - resolver caso isso aconteça
        }
        delete usuarioExiste.senha;

        return done(null, { access_token: jwtService.criarToken(usuarioExiste) })

    } catch (e) {
        return done(e, false);
    }
})

passport.use(localStrategy);
export const loginStrategy = passport.authenticate('local', { session: false });
export { passport };
