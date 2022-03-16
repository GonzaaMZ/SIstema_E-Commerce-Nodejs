const { DataTypes } = require("sequelize");
const {db} = require("../DB/config");

const Categoria = db.define('Categoria', {

    idCategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        get(){
            const rawValue = this.getDataValue('idCategoria');
            return rawValue ? rawValue : null;
        }
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        get(){
            const rawValue = this.getDataValue('nombre');
            return rawValue ? rawValue : null;
        }
    },
},

{
    tableName: 'Categorias',
    updatedAt: false
});

const iniciarTablaCategoria = async () => {
    try {
        await Categoria.sync({alter: true});
        console.log('Tabla creada existosamente')
    } catch (error) {
        console.log(error);
        console.log('No se pudo crear la tabla')
    }
}



module.exports = {
    iniciarTablaCategoria,
    Categoria
}