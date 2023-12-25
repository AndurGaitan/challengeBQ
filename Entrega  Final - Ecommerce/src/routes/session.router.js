import { Router } from 'express'
import { register, login, privateUser, errorUser } from '../controllers/session.controller.js'
//import { passportJWT } from '../utils.js'
import passport from 'passport'
import ProductService from "../services/product.services.js";

const router = Router()

const productService = new ProductService()

router.get('/home', async(req, res) => {
    try {
        const productsMongo = await productService.get();
        console.log(productsMongo)
        res.render('home', {productsMongo, style: 'home.css'})
    } catch (error) {
        res.status(500).send('Error al obtener todos los productos')
    }
})


router.get('/login', (req, res) => {
    res.render('login', {})
})
router.get('/register', ( req,res) => {
    res.render('register', {})
})

router.get('/login-github',
    passport.authenticate('github', { scope: ['user:email'] }),
    (req, res) => { }
)

router.get('/githubcallback',
    passport.authenticate('github', { failureRedirect: '/fail-github' }),
    (req, res) => {
        console.log('Callback:', req.user)

        res.cookie('keyCookieForJWT', req.user.token).redirect('/home')
    }
)

router.get('/fail-github', (req, res) => {
    res.render('fail_login', {})
})

router.get('/profile',
    passport.authenticate('jwt', {session: false }),
    (req, res) => {
        
        const { user } = req 
        console.log(user)
        res.render('profile', user)
    }
)

router.post(
    '/register',
    passport.authenticate('register', {
        failureRedirect: '/session/error'
    }), async(req,res) => {
        register
        res.redirect('api/session/login')
    }

)
router.post(
    '/login',
    passport.authenticate('login', '/login'), async(req, res) => {
        login
        return res.redirect('/api/products/')
    }
    
)

//router.get('/private', passportJWT(), privateUser)

router.get('/error', errorUser)

export default router