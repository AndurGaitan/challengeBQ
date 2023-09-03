import { Router } from 'express'
import { isValidPassword, createHash } from "../utils.js";
import UserModel from "../dao/mongo/models/users.model.js";

const router = Router()
router.get('/', (req, res) => {res.send('OK')})

router.get('/login', (req, res) => {
    res.render('login', {})
})
router.get('/register', ( req,res) => {
    res.render('register', {})
})

//Iniciar session
router.post('/login', async(req, res) => {
    const { email, password } = req.body
    //1 buscamos el usuario y validamos
    const user = await UserModel.findOne({email})
    console.log('El usuario es ' + user)
    if(!user) {
        console.log('No se encontro el usuario')
        return res.redirect('/login')
    } 

    //2 validamos por contraseña 

    if(!isValidPassword(user, password)){
        console.log('Password no valido')
        return res.redirect('/login')
    } 
    
    req.session.user = user

    return res.redirect('/api/products/')
})


//Registro
router.post('/register', async(req, res) => {
    const data = req.body
    data.password = createHash(data.password) //HASHEADO
    const result = await UserModel.create(data)
    console.log(result)

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