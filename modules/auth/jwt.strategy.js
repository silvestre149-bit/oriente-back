
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, } from "passport-jwt";

const JWT_SECRET = process.env.JWT_SECRET || 'teste';

const jwtOpt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('authorization'),
    secretOrKey: JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(jwtOpt, async (payload, done) => {

})