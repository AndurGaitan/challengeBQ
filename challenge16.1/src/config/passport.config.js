import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../models/user.model.js';
import { secretKey } from '../config.js';

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });

        if (!user || !user.isValidPassword(password)) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
    },
    async (jwtPayload, done) => {
      try {
        const user = await UserModel.findById(jwtPayload.sub);

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});










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