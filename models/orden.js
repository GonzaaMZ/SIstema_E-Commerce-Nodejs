const { DataTypes } = require("sequelize");
const {db} = require("../DB/config");
const { Producto } = require("./producto");

const Orden = db.define('Orden', {

    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        get(){
            const rawValue = this.getDataValue('idUsuario');
            return rawValue ? rawValue : null;
        }
    },

    monto: {
        type: DataTypes.INTEGER,
        get(){
            const rawValue = this.getDataValue('monto');
            return rawValue ? rawValue : null;
        }
    },

    estado: {
        type: DataTypes.STRING,
        defaultValue: 'Pendiente',
    }
},
{
    tableName: 'Ordenes',
    updatedAt: false
});


const iniciarTablaOrden = async () => {
    try {
        await Orden.sync({alter: true});
        console.log('Tabla creada existosamente')
    } catch (error) {
        console.log(error);
        console.log('No se pudo crear la tabla')
    }
}



module.exports = {
    Orden,
    iniciarTablaOrden
}

