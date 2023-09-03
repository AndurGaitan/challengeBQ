import { Router } from 'express'
import { isValidPassword, createHash } from "../utils.js";
import UserModel from "../dao/mongo/models/users.model.js";
import passport from 'passport';

const router = Router()
router.get('/', (req, res) => {res.send('OK')})

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

export default router