/*
Rutas de Usuarios Auth
host + /api/auth

*/ 
const express = require('express');
const router = express.Router();

const {createUser, loginUser, renewToken} = require('../controllers/auth');

router.post('/new', createUser);

router.post('/', loginUser);

router.get('/renew', renewToken);

module.exports = router;