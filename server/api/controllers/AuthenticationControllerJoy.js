const Joi = require('joi');

//pour vérifier les données rentrées par l'utilisateur au login/register
module.exports = {
    login (req, res, next) {
        const schema = {
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        }
        const {error} = Joi.validate(req.body, schema)

        if (error) {
            console.log('[ ERROR ]: ' + error.details[0].label)
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'Veuillez fournir une adresse email valide'
                    })
                    break
                case 'password':
                    switch (error.details[0].value) {
                        case undefined:
                            res.status(400).send({
                                error: 'Veuillez renseigner un mot de passe'
                            })
                            break
                        default:
                            res.status(400).send({
                                error: 'Mot de passe invalide'
                            })
                            break
                    }
                    break
                default:
                    res.status(400).send({
                        error: 'Problème lors de la connexion au compte'
                    })
                    break
            }
        } else {
            next()
        }
    },
    register (req, res, next) {
        const schema = {
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        }
        const {error} = Joi.validate(req.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'Veuillez fournir une adresse email valide'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: 'Le mot de passe doit contenir uniquement des caractères alphanumériques et doit comporter entre 8 et 64 caractères'
                    })
                    break
                default:
                    res.status(400).send({
                        error: "Problème lors de l'inscription"
                    })
                    break
            }
        } else {
            next()
        }
    }
}
