const { response, json } = require("express");
const Evento = require("../models/Evento");


const getEventos = async (req, resp = response, next) => {
    const eventos = await Evento.find().populate('user', 'name');
    resp.json({
        ok: true,
        eventos
    })
}

const actualizarEvento = async (req, resp = response, next) => {
    const eventoID = req.params.id;
    const uid = req.uid;
    try {
        const evento = await Evento.findById(eventoID);
        if(!evento){
            return resp.status(404).json({
                ok: false,
                msg: 'Ese ID de evento no existe'
            });
        }

        if(evento.user.toString() !== uid){
            return resp.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar el documento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoID, nuevoEvento, {new: true});
        resp.json({
            ok: true,
            evento: eventoActualizado
        });

        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const eliminarEvento = async (req, resp = response, next) => {
    const eventoID = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoID);
        if(!evento){
            return resp.status(404).json({
                ok: false,
                msg: 'Ese evento no existe'
            });
        }

        if(evento.user.toString() !== uid){
            return resp.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar el documento'
            })
        }
        console.log("hola");
        const eventoEliminado = await Evento.findByIdAndDelete(eventoID);
        resp.json({
            ok: true,
            eventoEliminado
        })
        
        
    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'Contactese con el administrador'
        })
    }

    resp.json({
        ok: true,
        msg: 'eliminar evento'
    })
}

const crearEvento = async (req, resp = response, next) => {
    const evento = new Evento(req.body);
    evento.user = req.uid;
    try {
        const eventoGuardado = await evento.save();
        resp.status(201).json({
            ok: true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
    console.log(req.body);
    resp.json({
        ok: true,
        msg: 'crear evento'
    })
}


module.exports = {
    getEventos,
    actualizarEvento,
    eliminarEvento,
    crearEvento
}