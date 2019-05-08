const sql = require('mssql');
const config = require('../config/config');

exports.ejecutaSql = (consulta, callback) => {

    const conn = new sql.ConnectionPool(config.urlDB);

    conn.connect()
        .then(() => {
            let solicitud = new sql.Request(conn);
            return solicitud.query(consulta);
        })
        .then(data => {
            callback(null, data);
        })
        .catch(err => {
            callback(err);
        });
}