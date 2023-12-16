import { generateToken } from '../utils.js'

export const register = async (req, res) => {
    res.redirect('/api/session/login')
}

export const login = async (req, res) => {
    if (!req.user) {
        return res.status(400).json({ error: 'Invalid credentials' })
    }

    const token = generateToken(req.user)

    res.json({ token })
}

export const privateUser = async (req, res) => {
    res.json({
        user: req.user
    })
}

export const errorUser = async (req, res) => {
    res.json({
        error: true
    })
}