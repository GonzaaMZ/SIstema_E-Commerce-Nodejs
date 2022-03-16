const { response } = require("express");
const { MontoTotal } = require("../helpers/sumar-monto");
const { Carro } = require("../models/carro");
const { Orden, iniciarTablaOrden } = require("../models/orden");

const crearOrden = async (req, res = response) => {

    const {idUsuario} = req.body;

    try {
        iniciarTablaOrden();

        //Recupero el carrito del usuario
        const carro = await Carro.findAll({
            where: {
                idUsuario: idUsuario
            },
            attributes: ['nombreProducto', 'idProductos']
            
        });

        const total = await MontoTotal(idUsuario);

        const orden = await Orden.create({idUsuario, monto: total});

        return res.status(200).json({
            orden,
            carro
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const eliminarOrden = async (req, res = response) => {

    const {id} = req.params;

    try {
        const ordenMostrar = await Orden.findByPk(id);
        
        const ordenEliminada = await Orden.destroy({
            where: {
                idUsuario: id
            }
        })

        return res.json({
           msg: 'Orden Eliminada',
           ordenMostrar
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }

}

const obtenerOrden = async (req, res = response) => {
    
    const {id} = req.params;

    try {
        const ordenMostrar = await Orden.findOne({
            where: {
                idUsuario: id
            }
        })

        return res.json({
           ordenMostrar
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }

}

const obtenerOrdenes = async (req, res = response) => {

    try {
        const ordenes = await Orden.findAll();
    
        return res.json(ordenes)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}



module.exports = {
    crearOrden,
    eliminarOrden,
    obtenerOrden,
    obtenerOrdenes
}