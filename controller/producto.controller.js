const { response } = require("express");

const {Producto, iniciarTablaProducto} = require("../models/producto");

const { Sequelize } = require('sequelize');



//Crear
const crearProducto = async (req, res = response) => {
    
    const body = req.body;
    
    
    try {
        iniciarTablaProducto(); //Se ejecuta una sola vez, al crear la tabla
        const producto = await Producto.create(body);
        return res.status(200).json(producto);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

//Actualizar
const actualizarProducto = async (req, res = response) => {

    const id = req.params.id;
    const body = req.body;

    try {
        const producto = await Producto.update(body, {
            where: {
                idProducto: id
            }
        });

        const productoMostrar = await Producto.findByPk(id);

        return res.status(200).json(productoMostrar)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

//Borrar
const borrarProducto = async (req, res = response) => {

    const id = req.params.id;

    try {
        const productoBorrado = await Producto.findByPk(id);

        const producto = await Producto.destroy({
            where: {
                idProducto: id
            }
        });

        return res.json({
            msg: 'Producto borrado',
            productoBorrado
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

//Obtener un producto 
const obtenerProductoById = async (req, res = response) => {

    const id = req.params.id;

    try {
        const producto = await Producto.findByPk(id);
        return res.json(producto);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

//Obtener todos los productos
const obtenerProductos = async (req, res = response) => {

    const usuario = await Producto.findAll();

    const total = await Producto.findAndCountAll({
        attributes: [[Sequelize.fn('COUNT', Sequelize.col('idProducto')), 'total_productos']]
    });

    return res.json({
        total,
        usuario
    })

}


module.exports = {
    crearProducto,
    actualizarProducto,
    borrarProducto,
    obtenerProductoById,
    obtenerProductos
}