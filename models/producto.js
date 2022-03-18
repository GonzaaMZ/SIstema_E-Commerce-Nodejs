const { DataTypes } = require("sequelize");
const {db} = require("../DB/config");
const { Categoria } = require("./categoria");

const Producto = db.define('Producto', {

    idProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        get(){
            const rawValue = this.getDataValue('idProducto');
            return rawValue ? rawValue : null;
        }
    },

    nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        get(){
            const rawValue = this.getDataValue('nombre');
            return rawValue ? rawValue : null;
        }
    },

    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            const rawValue = this.getDataValue('descripcion');
            return rawValue ? rawValue : null;
        }
    },

    img: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            const rawValue = this.getDataValue('img');
            return rawValue ? rawValue : null;
        }
    },

    disponible: {
        type: DataTypes.BOOLEAN,
        get(){
            const rawValue = this.getDataValue('disponible');
            return rawValue ? rawValue : null;
        }
    },

    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        get(){
            const rawValue = this.getDataValue('precio');
            return rawValue ? rawValue : null;
        }
    },

    color: {
        type: DataTypes.STRING,
        get(){
            const rawValue = this.getDataValue('color');
            return rawValue ? rawValue : null;
        }
    },

    talle: {
        type: DataTypes.STRING,
        get(){
            const rawValue = this.getDataValue('talle');
            return rawValue ? rawValue : null;
        }
    },

},

{
    tableName: 'Productos',
    updatedAt: false
});

Categoria.hasMany(Producto, {as: 'Categoria', foreignKey: 'idCategoria'});
Producto.hasOne(Categoria);

const iniciarTablaProducto = async () => {
    try {
        await Producto.sync({alter: true});
        console.log('Tabla creada existosamente')
    } catch (error) {
        console.log(error);
        console.log('No se pudo crear la tabla')
    }
}





module.exports = {
    Producto,
    iniciarTablaProducto
}

