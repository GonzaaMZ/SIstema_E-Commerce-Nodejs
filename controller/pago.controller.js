// SDK de Mercado Pago
const { response } = require("express");
const mercadopago = require("mercadopago");
const { Carro } = require("../models/carro");

// Agrega credenciales
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN_MP,
});

const crearPreferencia = async (req, res = response) => {

    const id = req.body.id;

    let productos = await Carro.findAll({
      where: {
        idUsuario: id,
      },
      raw: true,
      attributes: [
        ["nombreProducto", "title"],
        ["precio", "unit_price"],
        ["cantidad", "quantity"],
      ],
    });


    console.log(productos);

    // Crea un objeto de preferencia
    let preference = {
      items: productos,

      back_urls: {
        success: "http://localhost:8080/api/checkout/feedback",
        failure: "http://localhost:8080/api/checkout/feedback",
        pending: "http://localhost:8080/api/checkout/feedback",
      },
    };
  
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

const redireccion = (req, res) => {
  try {
    res.json({
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.merchant_order_id,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  redireccion,
  crearPreferencia,
};



    /*productos = productos.map(function(producto){
       console.log(producto); 
    })
*/