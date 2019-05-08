const express = require('express');
const app = express();
const db = require('./db');


app.get('/cliente/:rut', (req, res) => {

    let rut = req.params.rut;
    let consulta = `select * from maecli where cl_rutcli = ${rut}`;

    db.ejecutaSql(consulta, (err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (data.recordset.length === 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe el cliente'
                }
            });
        }

        res.json({
            ok: true,
            cliente: data
        });
    });

});

app.get('/cliente', (req, res) => {

    let consulta = `select * from maecli`;

    db.ejecutaSql(consulta, (err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (data.recordset.length === 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se han creado clientes'
                }
            });
        }

        res.json({
            ok: true,
            clientes: data
        });
    });

});



module.exports = app;