import { Router } from 'express'
import { register, login, privateUser, errorUser } from '../controllers/session.controller.js'
//import { passportJWT } from '../utils.js'
import passport from 'passport'

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