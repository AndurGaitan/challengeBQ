import { generateToken } from '../utils.js'

export const register = async (req, res) => {
        const { token, ...userWithoutToken } = req.user;

        res.cookie('coderCookie', token, {
            maxAge: 60 * 60 * 1000, 
            httpOnly: true
        });
        res.status(200).json({ message: 'Registro exitoso', user: userWithoutToken });
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