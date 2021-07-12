const { response } = require("express");
const bcrypt = require('bcryptjs');
const User = require("../models/User");
const { generarJWT } = require("../helpers/jwt");


const createUser = async (req, resp = response) => {
  const { email, password } = req.body;

  try {
      let usuario = await User.findOne({email})

    if(usuario){
        return resp.status(400).json({
            ok: false,
            msg: 'Usuario ya existente'
        })
    }

    usuario = new User(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    console.log(usuario.password);

    await usuario.save();

    //Generar token
    const token = await generarJWT(usuario.id, usuario.name);

    resp.status(201).json({
      Ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });
  } catch (error) {
      resp.status(500).json({
          ok: false,
          msg: 'Por favor hable con el administrador'
      })
  }
};

const loginUser = async (req, resp = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await User.findOne({email})

    if(!usuario){
        return resp.status(400).json({
            ok: false,
            msg: 'No existe ese usuario'
        })
    }

    //confirmar password
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if(!validPassword){
        return resp.status(400).json({
            ok: false,
            msg: "Contraseña incorrecta"
        })
    }

    //Generar token
    const token = await generarJWT(usuario.id, usuario.name);

    resp.json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        token
    })
    

      
  } catch (error) {
      console.log(error);
    resp.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador'
    })
  }
};

const renewToken = async (req, resp = response) => {
  const uid = req.uid;
  const name = req.name
  //GENERAR JWT
  const token = await generarJWT(uid, name);
  resp.json({
    ok: true,
    token

  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
