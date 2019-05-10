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

app.get('/clientes', (req, res) => {

    let consulta = `select cl_rutcli, cl_nomcli from maecli`;

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

app.put('/cliente/update/:rut', (req, res) => {
    let rut = req.params.rut;
    let body = req.body;
    let query = `update maecli set cl_nomcli = '${body.nombre}' where cl_rutcli = ${rut}`;

    db.ejecutaSql(query, (err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (data.rowsAffected[0] === 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe el cliente'
                }
            });
        }


        res.json({
            ok: true,
            message: 'cliente actualizado',
            lineasAfectadas: data.rowsAffected[0]
        });
    });

})



module.exports = app;