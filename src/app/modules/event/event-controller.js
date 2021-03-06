const {response, request} = require('express');
const Event = require('./../../models/event-model');

const create = async (req = request, res = response) => {

    console.log(req);
    const {_id: user} = req.user;
    const event = req.body

    try {
        const eventCreated = {
            ...event,
            user,
        }

        const newEvent = new Event(eventCreated);
        const eventSaved = await newEvent.save();

        return res.status(201)
            .json({
                ok: true,
                eventSaved,
            });

    } catch (e) {
        console.error({
            mensaje: 'Erro al crear un evento',
            erro: e,
        });
        return res.status(500)
            .json({
                ok: false,
                mensaje: 'Error al crear un evento',
            });
    }
}

const update = async (req = request, res = response) => {
    const {id} = req.params;
    const {_id: user} = req.user;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404)
                .json({
                    ok: false,
                    mensaje: 'No se encontro el evento a editar'
                });
        }


        if ( event.user.toString() !== user.toString() ) {
            return res.status(401).json({
                ok: false,
                mensaje: 'No tiene privilegio de editar este evento'
            });
        }

        const newEvent = {
            ...req.body.event,
            user,
        }

        const eventUpdated = await Event.findByIdAndUpdate(id, newEvent, {new: true})
            .populate('user');

        return res.status(200)
            .json({
                ok: true,
                eventUpdated
            });

    } catch (e) {
        console.error({
            mensaje: 'Error al buscar todos los eventos',
            error: e,
        });
        return res.status(500)
            .json({
                ok: false,
                mensaje: 'Error al buscar todos los eventos',
            });
    }
}

const findAll = async (req = request, res = response) => {
    try {
        const events = await Event.find({})
            .populate('user');
        return res.status(200)
            .json({
                ok: true,
                events
            });

    } catch (e) {
        console.error({
            mensaje: 'Error al buscar todos los evento',
            error: e,
        });
        return res.status(500)
            .json({
                ok: false,
                mensaje: 'Error al buscar todos los eventos',
            });
    }
}

const findById = async (req = request, res = response) => {
    const {id} = req.params;
    try {
        const event = await Event.findById(id)
            .populate('user');
        return res.status(200)
            .json({
                ok: true,
                event
            });

    } catch (e) {
        console.error({
            mensaje: 'Error al buscar evento por id',
            error: e,
        });
        return res.status(500)
            .json({
                ok: false,
                mensaje: 'Error al buscar evento por id',
            });
    }
}

const deleteOne = async (req = request, res = response) => {
    const {id} = req.params;
    const {_id: user} = req.user;

    try {
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404)
                .json({
                    ok: false,
                    mensaje: 'No se encontro el evento a eliminar'
                });
        }

        if ( event.user.toString() !== user.toString() ) {
            return res.status(401).json({
                ok: false,
                mensaje: 'No tiene privilegio de eliminar este evento'
            });
        }


        await Event.findByIdAndDelete(id)
        return res.status(200)
            .json({
                ok: true,
                mensaje: 'Evento eliminado',
            });

    } catch (e) {
        console.error({
            mensaje: 'Error al eliminar evento por id',
            error: e,
        });
        return res.status(500)
            .json({
                ok: false,
                mensaje: 'Error al eliminar evento por id',
            });
    }
}

module.exports = {
    create,
    update,
    findAll,
    findById,
    deleteOne,
}