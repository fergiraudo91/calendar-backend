const {response} = require('express');

const createUser = (req, resp = response) => {
    const {name, email, password} = req.body;
    if(name.length < 5 ){
        return resp.status(400).json({
            ok: false,
            msg: 'El nombre debe de tener mas de 5 letras'
        })
    }
    resp.json({
        Ok: true,
        msg: 'register',
        name,
        email,
        password
    })
}

const loginUser = (req, resp = response) => {
    const {email, password} = req.body;
    resp.json({
        Ok: true,
        msg: 'login',
        email,
        password
    })
}

const renewToken = (req, resp = response) => {
    resp.json({
        Ok: true,
        msg: 'renew'
    })
}


module.exports = {
    createUser,
    loginUser,
    renewToken
}