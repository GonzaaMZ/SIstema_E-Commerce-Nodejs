
const {Sequelize} = require('sequelize');

//Valores en .env
const db = new Sequelize(process.env.NOMBREDB , process.env.USER_MYSQL, process.env.PASS_MYSQL, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false
});

const dbConnection = async () => {
    try {
        await db.authenticate();
        console.log('Conexion a base de datos exitosa')

    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    db,
    dbConnection
}