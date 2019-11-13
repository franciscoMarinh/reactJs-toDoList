const passport = require('passport');
const passportJWT = require('passport-jwt');

module.exports = app => {

const users = app.models.users
const cfg = app.config.development
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = cfg.secretOrKey;

let strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    users.findByPk(jwt_payload.id)
        .then(user => {
            if (user) {
                return next(null,{
                    id: user.id,
                    email: user.email
                })
            }else {
                next(null, false);
            }
        })
        .catch(error => done (error, null))
    
  });

    passport.use(strategy);
    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", cfg.jwtSession)
        }

    };
};