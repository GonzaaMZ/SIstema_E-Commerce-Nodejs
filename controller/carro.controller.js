const { response } = require("express");
const { Op } = require("sequelize");

const { Carro, iniciarTablaCarro } = require("../models/carro");
const { Producto } = require("../models/producto");

const agregarProductoCarro = async (req, res = response) => {
  const { id } = req.query;
  const { IdAgregarProducto } = req.body;

  try {
    iniciarTablaCarro();

    
    const producto = await Carro.findOne({
      where: {
        [Op.and]: [{ idProductos: IdAgregarProducto }, { idUsuario: id }],
      },
    });
    //Recuperar nombre del producto
    let nombre = await Producto.findOne({
      where: {
        idProducto: IdAgregarProducto,
      },
    });

    let precio = await Producto.findOne({
      where: {
        idProducto: IdAgregarProducto,
      },
    });
    nombre = nombre.getDataValue("nombre");
    precio = precio.getDataValue("precio");

    console.log(producto);

    let carro = new Carro();

    if (!producto) {
      const carro = await Carro.create(
        {
          idUsuario: id,
          nombreProducto: nombre,
          idProductos: IdAgregarProducto,
          precio: precio,
          cantidad: 1,
        },
        {
          include: [Producto],
        }
      );
      //Listar nombres de todos los productos del carrito
      const productos = await Carro.findAll({
        where: {
          idUsuario: id,
        },
        attributes: ["nombreProducto", "idCarro", "precio", "cantidad"],
      });

      return res.json({
        carro,
        productos,
      });

    } else {
      await producto.increment("cantidad");

      const productos = await Carro.findAll({
        where: {
          idUsuario: id,
        },
        attributes: ["nombreProducto", "idCarro", "precio", "cantidad"],
      });
      return res.json({
        carro,
        productos,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};




const eliminarProductoCarro = async (req, res = response) => {
  const { id } = req.query;
  const { idEliminarProducto } = req.body;

  try {
    let producto = await Carro.findOne({
      where: {
        [Op.and]: [{ idProductos: idEliminarProducto }, { idUsuario: id }],
      },
    });

    let cantidad = producto.getDataValue("cantidad");

    console.log(cantidad);

    if (cantidad > 1) {
      await producto.increment({cantidad: -1});
    
      //Listar nombres de todos los productos del carrito
      const productos = await Carro.findAll({
        where: {
          idUsuario: id,
        },
        attributes: ["nombreProducto", "idCarro", "precio", "cantidad"],
      });

      return res.json({
        productos,
      });

    } else {
      await producto.destroy();
      //Listar nombres de todos los productos del carrito
      const productos = await Carro.findAll({
        where: {
          idUsuario: id,
        },
        attributes: ["nombreProducto", "idCarro", "precio", 'cantidad'],
      });

      return res.json({
        productos,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const eliminarCarro = async (req, res = response) => {
  const { id } = req.params;

  try {
    const carro = await Carro.destroy({
      where: {
        idUsuario: id,
      },
    });

    res.json({
      msg: `Carro eliminado con exito - ID de usuario: ${id}`,
      carro,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const obtenerCarro = async (req, res = response) => {
  const { id } = req.params;

  const carro = await Carro.findOne({
    where: {
      idUsuario: id,
    },
  });

  //Listar nombres de todos los productos del carrito
  const productos = await Carro.findAll({
    where: {
      idUsuario: id,
    },
    attributes: ["nombreProducto", "idCarro", "precio"],
  });

  res.json({
    carro,
    productos,
  });
};

const obtenerCarros = async (req, res = response) => {
  const carros = await Carro.findAndCountAll();

  res.json(carros);
};

module.exports = {
  agregarProductoCarro,
  eliminarCarro,
  eliminarProductoCarro,
  obtenerCarro,
  obtenerCarros,
};
