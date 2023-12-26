import passport from "passport";
import jwt from 'passport-jwt';
import local from 'passport-local';
import config from './config.js'
import UserService from '../services/user.service.js'
import { extractCookie, generateToken, createHash} from "../utils.js"
import passportJWT from 'passport-jwt'
import GithubStrategy from 'passport-github2'

const JWTStrategy = jwt.Strategy 
const ExtractJWT = jwt.ExtractJwt 
const LocalStrategy = local.Strategy
const userService = new UserService()

// const cookieExtractor = req => {
//     const token = (req?.cookies) ? req.cookies['coderCookie'] : null

//     console.log('COOKIE EXTRACTOR: ', token)
//     return token
// }


const initializePassport = () => {

    passport.use('github', new GithubStrategy(
        {
            clientID: config.clientId,
            clientSecret: config.clientSecret,
            callbackURL: config.callbackUrl
        },
        async (accessToken, refreshToken, profile, done) => { 
            console.log(profile)
            
            try {
                const email = profile._json.email || null;
                if(!email){
                    return done('Correo electrónico no disponible en el perfil de GitHub');
                }
                const user = await userService.getByEmail( email )
                if(user) {
                    console.log('User already exits!!')
                } else {
                    console.log(`User doesn't exits. So register them`)

                    const newUser = {
                        name: profile._json.name,
                        email,
                        password: '',
                        social: 'github',
                        role: 'user'
                    }
                    const result = await userService.create(newUser)
                    console.log(result)
                }

                const token = generateToken(user)
                user.token = token

                return done(null, user)

            } catch (e) {
                return done('Error to login with github' + e) 
            }
        }
    ))

    passport.use('register', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                const existingUser = await userService.getByEmail(email);
    
                if (existingUser) {
                    return done(null, false, { message: 'El correo electrónico ya está registrado.' });
                }
    
                const newUser = {
                    name: req.body.name,
                    email,
                    password: await createHash(password, 10), 
                    role: 'user'
                };
                console.log(newUser)
    
                const createdUser = await userService.create(newUser);
                const token = generateToken(createdUser);
    
                createdUser.token = token;
    
                return done(null, createdUser);
    
            } catch (error) {
                return done(error);
            }
        }
    ));

    // passport.use('register', new LocalStrategy({
    //     passReqToCallback: true,
    //     usernameField: 'email',
    //     passwordField: 'password'
    // }, async(req, username, password, done) => {
    //     const {email, name, role} = req.body
    //     console.log({email, name, role})
    //     try {
    //         const user = await userService.getByEmail(email)
    //         console.log({user})
    //         if(user) {
    //             console.log('User already exits')
    //             return done(null, false)
    //         }

    //         const newUser = { email, name, password, role }
    //         const result = await userService.create(newUser)
    //         const access_token = generateToken(user)
    //         console.log("hasta aqui", access_token)
            
    //         res.cookie('coderCookie', access_token, {
    //             maxAge: 60*60*1000,
    //             httpOnly: true
    //         }).send({message: 'Logged In con cookie!'})


    //         return done(null, result)
    //     } catch (error) {
    //         return done('[LOCAL] Error from register user')
    //     }
    // }))

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
                jwtFromRequest: ExtractJWT.fromExtractors([extractCookie]),
                secretOrKey: 'coderTokenForJWT'
            },
            async (jwt_payload, done) => {
                console.log({jwt_payload})

                try {
                    return done(null, jwt_payload)
                } catch (e) {
                    return done(e)
                }
            })
    )

    passport.serializeUser((user, done) => {
        done(null, user?.id ?? user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userService.getById(id)
        done(null, user )
    })

}

export default initializePassport