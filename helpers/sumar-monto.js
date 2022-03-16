const { Carro } = require("../models/carro");

const MontoTotal = async (id) => {
  
      //Obtener todos los productos del carrito
      const productos = await Carro.findAll( {
        where: {
          idUsuario: id,
        },
        attributes: ['idProductos','precio']
      });
  
      let x = productos.map(function(producto){
          return producto.precio;
      })
      console.log(x);
    
      let total = 0;  
      for (let i = 0; i< x.length; i++) {
        total = total + x[i];
      }
      console.log(total);
      return total;
  
};


module.exports = {
  MontoTotal,
}

/*
return new Promise (async (resolve, reject) => {

  //Listar nombres de todos los productos del carrito
  const IDproductos = await Carro.findAll( {
    where: {
      idUsuario: id,
    },
    attributes: ['idProductos','precio']
  });

  let x = IDproductos.map(function(producto){
      return producto.precio;
  })
  console.log(x);

  let total = 0;  
  for (let i = 0; i< x.length; i++) {
    total = total + x[i];
  }
  console.log(total);

  ((err) => {
    if (err) {
      reject(err)
    }

    resolve(total)
  })
  
})
*/