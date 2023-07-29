import express from 'express'

const app = express()

const PORT = 8080

const frase = 'Practicando JavaScript en backend'

app.get('/frase', (req, res) => {
    res.send({frase})
})

app.get('/frase/:pos', (req, res) => {
    const fraseD = frase.split(' ')
    res.send({frase: fraseD[req.params.pos - 1]})
})

app.post('/frase', (req, res) => {

    
})

app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto + PORT')
})