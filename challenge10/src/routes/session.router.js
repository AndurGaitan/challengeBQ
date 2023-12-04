import { Router } from 'express'
import { isValidPassword, createHash } from "../utils.js";
import UserModel from "../DAO/mongo/user.dao.mongo.js";
import passport from 'passport';

const router = Router()
router.get('/', (req, res) => {
    res.render('home', {})
})

router.get('/login', (req, res) => {
    res.render('login', {})
})
router.get('/register', ( req,res) => {
    res.render('register', {})
})

//Iniciar session con passport
router.post('/login',passport.authenticate('login', '/login'), async(req, res) => {
    if (!req.user) return res.status(400).send('Invalid Credentials')
    req.session.user = req.user

    return res.redirect('/api/products/')
})


//Registro
router.post('/register',passport.authenticate('register', {failureRedirect: '/register'}), async(req, res) => {

    res.redirect('/api/session/login')
    
})

//Profile
function auth(req, res, next){
    if(req.session?.user) next()
    else res.redirect('/api/session/login')
}

router.get('/profile', auth, (req, res) => {
    const user = req.session.user
    res.render('profile', user)
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/api/session/login');
    })
})

//GITHUB
router.get(
    '/login-github',
    passport.authenticate('github', {scope: ['user:email'] }),
    async(req, res) => {}
)

router.get(
    '/githubcallback',
    passport.authenticate('github', { failureRedirect: '/'}),
    async(req, res) => {
        console.log('Callback: ', req.user)
        req.session.user = req.user
        console.log(req.session)
        res.redirect('/api/session/profile')
    }
)

export default router