//process, obj global que existe mientras corre la app de node y cambia dependiendo de el entorno donde este la app


//=======================
// puerto
//=======================
//si no existe process.env.PORT, el puerto sera el 3000(cuando corra local)
process.env.PORT = process.env.PORT || 3000;



//=======================
// entorno (envioroment)
//=======================
//process.env.NODE_ENV es una variable de entonrno en heroku, si existe esta variable estamos en produccion, si no en dessarrllo
process.env.NODE_ENV = process.env.NODE_ENV || 'desarrollo';



//=======================
// vencimiento del token
//=======================
process.env.CADUCIDAD_TOKEN = '1h' //60 * 60 * 24 * 30; //esto serian 30 dias, (60segundos * 60minutos * 24horas * 30dias)



//=======================
// seed del token, autenticacion
//=======================
//process.env.SEED_TOKEN(2), variable de entorno en heruku, debe de ser lo mas compleja posible, se manejara de forma automatica
process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'seed-desarrollo';



//=======================
// base de datos
//=======================
//estos valores deben ser una variable de entorno en el servidor
const urlDB = {
    user: 'sa',
    password: 'siemssg65',
    server: 'clientes.siems.cl', // instancia
    database: 'a000_sysges99',
    port: 1433, // por defecto 1433
    options: {
        encrypt: false // true si es windows azure
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

process.env.CONFIG = process.env.CONFIG || urlDB;


module.exports = {
    urlDB
}