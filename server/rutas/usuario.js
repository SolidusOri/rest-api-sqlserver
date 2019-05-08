const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../modelos/usuario');
const { verificaToken } = require('../middlewares/autenticacion');



app.post('/registro', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });

    //save retorna un err o un usuario de base de datos
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})


app.put('/usuario/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    let usuario = _.pick(req.body, ['nombre', 'apellido', 'region', 'comuna', 'direccion', 'telefono']); //crea un clon del obj filtrando con los atributos que se indican en el array

    //Es igual el id del usuario logueado al id del token(payload)
    if (id == req.usuario._id) {

        Usuario.findOneAndUpdate({ _id: id }, usuario, { new: true, useFindAndModify: false }, (err, usuarioActualizado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                usuario: usuarioActualizado
            })
        });

    } else {
        console.log(id, '<>', req.usuario._id);
        return res.status(403).json({
            ok: false,
            err: {
                message: 'Token de la peticion no corresponde'
            }
        });
    }

})


module.exports = app;