//const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register (req, res) {
        try {
            if (typeof req.body.email === 'undefined' || typeof req.body.password === 'undefined') {
                throw Object.assign(new Error('Wrong fields'), { code: 400, msg: 'Try again.', origin: 'throw' })
            }
            const user = await User.create(req.body)
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            if (err.origin === 'throw') {
                res.status(err.code).send({
                    error: err.msg
                })
            } else {
                res.status(400).send({
                    error: 'Cette adresse email est déjà utilisée.'
                })
            }
        }
    },
    async getUsers (req, res) {
        try {
            const users = await User.findAll()

            if (!users) {
                return res.status(403).send({
                    error: 'Aucuns Utilisateurs enregistré'
                })
            } else {
                res.send(users)
            }
        } catch (err) {
            res.status(500).send({
                error: 'Une erreur est survenue (serveur)'
            })
        }
    },
    async login (req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                return res.status(403).send({
                    error: "L'utilisateur n'existe pas"
                })
            }

            const isPasswordValid = await user.comparePassword(password)
            console.log(password)
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'Les infos sont incorrects (password)'
                })
            }

            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            res.status(500).send({
                error: 'Une erreur est survenue (serveur)'
            })
        }
    }
}
