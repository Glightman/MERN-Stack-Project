import bcrypt from 'bcrypt'
import User from '../models/User.js'
import { loginService, generateToken } from '../services/auth.service.js'

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await loginService(email)

        if(!user){
            return res.status(404).send({ message: "Email ou senha inválidos" })
        }

        const passwordIsValid = await bcrypt.compare(password, user.password)

        if(!passwordIsValid){
            return res.status(404).send({ message: "Email ou senha inválidos" })
        }

        const jwToken = generateToken(user.id)

        res.send({jwToken})
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export { login }