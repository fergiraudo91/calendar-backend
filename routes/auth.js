/*
Rutas de Usuarios Auth
host + /api/auth

*/ 
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {createUser, loginUser, renewToken} = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/new', 
[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
    fieldValidator
],
createUser);

router.post('/',
[
    check("email", "Debe ser un email correcto").isEmail(),
    check("password", "La contraseña debe ser correcta").isLength({min: 6}),
    fieldValidator
],
loginUser);

router.get('/renew', validarJWT, renewToken);

module.exports = router;