'use strict'

const User = require('../models/user')
const services = require('../services')

function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

    user.save((err) =>{
        if(err) return res.status(500).send({ message: `Error al crear usuario ${err}`});
        
            return res.status(200).send({ token: services.createToken(user) });
    })
}
function signIn (req, res) { //(req, res)
    User.find({email: req.body.email}, (err, user) =>{
        if (err) return res.status(500).send({message: `Error al registrarse ${err}`})
        if (!user) return res.status(404).send({message: 'no existe el usuario'})

        req.user = user
        res.status(200).send({
            message: 'te has logueado corectamente',
            token: services.createToken(user)
        })
    })
}

module.exports ={
    signUp,
    signIn
} 