import passport from "passport";
import jwt from 'passport-jwt';
import local from 'passport-local';
import config from './config.js'
import UserService from '../services/user.service.js'

const JWTStrategy = jwt.Strategy // La estrategia de JWT
const ExtractJWT = jwt.ExtractJwt // La funcion de extraccion
const LocalStrategy = local.Strategy
const userService = new UserService()

const cookieExtractor = req => {
    const token = (req?.cookies) ? req.cookies['coderCookie'] : null

    console.log('COOKIE EXTRACTOR: ', token)
    return token
}


const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async(req, username, password, done) => {
        const {email, name, role} = req.body
        console.log({email, name, role})
        try {
            const user = await userService.getByEmail
            console.log({user})
            if(user) {
                console.log('User already exits')
                return done(null, false)
            }

            const newUser = { email, name, password, role }
            const result = await userService.create(newUser)

            return done(null, result)
        } catch (error) {
            return done('[LOCAL] Error from register user')
        }
    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async(username, password, done) => {
        const user = await userService.getByEmail(username)
        if(!user) {
            console.log('User doesnt exist')
            return done(null, false)
        }

        if(user.password !== password) return done(null, false)

        return done(null, user)
    }))

    passport.use(
        'jwt',
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
                secretOrKey: 'coderTokenForJWT'
            },
            async (jwt_payload, done) => {

                try {
                    return done(null, jwt_payload)
                } catch (e) {
                    return done(e)
                }
            })
    )

}

export default initializePassport