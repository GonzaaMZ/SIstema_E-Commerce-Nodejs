const { DataTypes } = require("sequelize");
const {db} = require("../DB/config");
const { Producto } = require("./producto");


const Carro = db.define('Carro', {
    
    idCarro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        get(){
            const rawValue = this.getDataValue('idCarro');
            return rawValue ? rawValue : null;
        }
    },

    idUsuario: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            const rawValue = this.getDataValue('idUsuario');
            return rawValue ? rawValue : null;
        }
    },

    idProductos: {
        type: DataTypes.INTEGER,
        get(){
            const rawValue = this.getDataValue('idProductos');
            return rawValue ? rawValue : null;
        }
    },

    nombreProducto :{
        type: DataTypes.STRING
    },

    precio: {
        type: DataTypes.DOUBLE
    },

    cantidad: {
        type: DataTypes.INTEGER,
        get(){
            const rawValue = this.getDataValue('cantidad');
            return rawValue ? rawValue : null;
        }
    },

    estado: {
        type: DataTypes.STRING
    }
    
},

{
    tableName: 'Carros',
    updatedAt: false
});

Carro.hasMany(Producto);



const iniciarTablaCarro = async () => {
    try {
        await Carro.sync({alter: true});
        console.log('Tabla creada existosamente')
    } catch (error) {
        console.log(error);
        console.log('No se pudo crear la tabla')
    }
}



module.exports = {
    Carro,
    iniciarTablaCarro
}