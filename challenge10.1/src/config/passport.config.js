import passport from 'passport'
import jwt from 'passport-jwt'
import local from 'passport-local'
import config from './config.js'
import githubStrategy from 'passport-github2' 
import { createHash, isValidPassword } from "../utils.js";
import UserService from './../services/user.services.js'


const LocalStrategy = local.Strategy
const PRIVATE_KEY = config.jwtPrivateKEY
const userService = new UserService()

export const initializePassport = () => {
    passport.use('registerStrategy', new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true,
        },
        async (req,username, password, done)=>{
            try {
                const {first_name, last_name, age} = req.body;
                const user = await userService.getByEmail(username);
                if(user){
                    return done(null );
                }
                const newUser = {
                    first_name: first_name,
                    last_name: last_name,
                    age: age,
                    email: username,
                    password: createHash(password)
                }
                const userCreated = await userService.saveUsers(newUser);
                return done(null, userCreated)

            } catch (error) {
                done(error)
            }
        }
    ));

    passport.use("loginStrategy", new LocalStrategy(
        {
            usernameField: "email"
        },
        async(username, password, done)=> {
            try {
                const user = await userService.getByEmail(username)
                if(!user) {
                    return done(null, false)
                }
                if(isValidPassword(user, password)){
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error)
            }
        }

    ));

    // passport.use('githubLoginStrategy', new githubStrategy(
    //     {
    //         clientID: process.env.clientID,
    //         clientSecret:process.env.clientSecret,
    //         callBackURL:process.env.callBackURL,
    //     },
    //     async(accesToken, refreshToken, profile, done)=>{
    //         try {
    //         console.log('profile', profile);
    //         const user = await userService.getByEmail(profile.username);
    //         if(!user){
    //             const newUser = {
    //                 first_name:'',
    //                 email: profile.username,
    //                 password: createHash(profile.id)
    //             };
    //             const userCreated = userService.saveUsers(newUser)
    //             return done(null, userCreated)
    //         } else { 
    //             return done(null, user)
    //         }

    //         } catch (error) {
    //             return done(error)
    //         }
    //     }
    // ))


    passport.use('jwt', new jwt.Strategy({
        jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (e) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user?.id ?? user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userService.getById(id)
        done(null, user )
    })
}

export default initializePassport


// import passport from 'passport'
// import local from 'passport-local'
// import UserModel from '../DAO/mongo/models/user.model.js'
// import GitHubStrategy from 'passport-github2'
// import { createHash, isValidPassword } from '../utils.js'

// const LocalStrategy = local.Strategy
// // App ID: 385349
// // Client ID: Iv1.6fae08462438548f
// //secret:ba0d8672146c76b53dfd358d5c1f59844cc395fd
// const initializePassport = () => {
//     //Iniciar sesion con git hub
//     passport.use('github', new GitHubStrategy(
//         {
//             clientID: 'Iv1.6fae08462438548f',
//             clientSecret: 'ba0d8672146c76b53dfd358d5c1f59844cc395fd',
//             callbackURL: 'http://localhost:8080/githubcallback'
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             console.log(profile)

//             try  {
//                 const user = await UserModel.findOne({ email: profile._json.email  })
//                 if(user) {
//                     console.log('User already exits ' + email)
//                     return done(null, user)
//                 }

//                 const newUser = {
//                     name: profile._json.name,
//                     email:  profile._json.email,
//                     password: ''
//                 }
//                 const result = await UserModel.create(newUser)
//                 return done(null, result)
//             } catch(e) {
//                 return done('Error to login wuth github' + e)
//             }
//         }
//     ))
//     // register Es el nomber para Registrar con Local - el 'registro' nos servira como midelware
//     passport.use('register', new LocalStrategy(
//         //Local stategy recibe dor argumentos
//         //El primero es el objeto de configuracion
//         {
//             passReqToCallback: true, //Permite que pueda acceder al objeto request como cualquier otro midelware
//             usernameField: 'email'
//         },
//         //El segundo es --- tiene cuatro parametros la request, el user, el password y el done
//         async (req, username, password, done) => {
//             const { name, email } = req.body
//             try {
//                 const user = await UserModel.findOne({ email: username })
//                 if (user) {
//                     console.log('User already exits')
//                     return done(null, false)
//                 }

//                 const newUser = {
//                     name,
//                     email,
//                     password: createHash(password)
//                 }
//                 const result = await UserModel.create(newUser)
//                 return done(null, result)
//             } catch (e) {
//                 return done('Error to register ' + error)
//             }
//         }
//     ))

//     // login Es el nombre para IniciarSesion con Local
//     passport.use('login', new LocalStrategy(
//         { usernameField: 'email' },
//         async (username, password, done) => {
//             try {
//                 const user = await UserModel.findOne({ email: username }).lean().exec()
//                 if (!user) {
//                     console.error('User doesnt exist')
//                     return done(null, false)
//                 }

//                 if (!isValidPassword(user, password)) {
//                     console.error('Password not valid')
//                     return done(null, false)
//                 }

//                 return done(null, user)
//             } catch (e) {
//                 return done('Error login ' + error)
//             }
//         }
//     ))

//     passport.serializeUser((user, done) => {
//         done(null, user._id)
//     })

//     passport.deserializeUser(async (id, done) => {
//         const user = await UserModel.findById(id)
//         done(null, user)
//     })

// }

// export default initializePassport