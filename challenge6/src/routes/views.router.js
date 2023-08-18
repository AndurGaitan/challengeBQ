import {Router} from 'express'

const router = Router()
const products = [{
    
}]
router.get('/', (req, res) => {
    res.render('home', {})
})