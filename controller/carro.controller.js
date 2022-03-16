const { response } = require("express");
const req = require("express/lib/request");
const { Carro, iniciarTablaCarro } = require("../models/carro");
const { Producto } = require("../models/producto");


const agregarProductoCarro = async (req, res = response) => {

    const {id} = req.query;
    const {IdAgregarProducto} = req.body;

    let carro;

    try {
        iniciarTablaCarro();

        if(IdAgregarProducto){
            //Recuperar nombre del producto
            let nombre = await Producto.findOne({
                where: {
                    idProducto : IdAgregarProducto
                }
            });

            let precio = await Producto.findOne({
                where: {
                    idProducto: IdAgregarProducto
                }
            })
            nombre = nombre.getDataValue('nombre');
            precio = precio.getDataValue('precio');

            console.log(precio);

            //Sumar producto al carro
            carro = await Carro.create({
                idUsuario: id,
                nombreProducto: nombre,
                idProductos: IdAgregarProducto,
                precio: precio
            }, {
             include: [ Producto ]
            });

        } 

        //Listar nombres de todos los productos del carrito
        const productos = await Carro.findAll({
            where: {
                idUsuario: id
            },
            attributes: ['nombreProducto', 'idCarro', 'precio']
        })

        res.json({
            carro,
            productos
        });

    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }

}

const eliminarProductoCarro = async (req, res = response) => {

    const {id} = req.query;
    const {idEliminarProducto} = req.body;

    //Eliminar Producto del carro
    if (idEliminarProducto) {
        const eliminarProducto = await Carro.destroy({
            where: {
                idCarro: idEliminarProducto
            }
        })   
    }
    //Listar nombres de todos los productos del carrito
    const productos = await Carro.findAll({
        where: {
            idUsuario: id
        },
        attributes: ['nombreProducto', 'idCarro', 'precio']
    })

    res.json({
        productos
    });

}



const eliminarCarro = async (req, res = response) => {

    const {id} = req.params;

    try {
        
        const carro = await Carro.destroy({
            where: {
                idUsuario: id
            }
        })

        res.json({
            msg: `Carro eliminado con exito - ID de usuario: ${id}`,
            carro
        })


    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

}


const obtenerCarro = async (req, res = response) => {

    const {id} = req.params;

    const carro = await Carro.findOne({
        where: {
            idUsuario: id
        }
    })

    //Listar nombres de todos los productos del carrito
    const productos = await Carro.findAll({
        where: {
            idUsuario: id
        },
        attributes: ['nombreProducto', 'idCarro', 'precio']
    })
    
    res.json({
        carro,
        productos
    });
}

const obtenerCarros = async (req, res = response) => {

    const carros = await Carro.findAndCountAll();

    res.json(carros)

}

module.exports = {
    agregarProductoCarro,
    eliminarCarro,
    eliminarProductoCarro,
    obtenerCarro,
    obtenerCarros
}