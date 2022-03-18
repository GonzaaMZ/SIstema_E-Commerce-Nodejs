const { Carro } = require("../models/carro");

const MontoTotal = async (id) => {
  
      //Obtener todos los productos del carrito
      const productos = await Carro.findAll( {
        where: {
          idUsuario: id,
        },
        attributes: ['idProductos','precio', 'cantidad']
      });
  
      let subtotal = productos.map(function(i){
        let precio = i.precio;
        let cantidad = i.cantidad;
        let total = precio * cantidad
        return total;
      })
      console.log(subtotal);
    
     let total = 0;  
      for (let i = 0; i< subtotal.length; i++) {
        total = total + subtotal[i];
      }
      console.log(total);
      return total;

};


module.exports = {
  MontoTotal,
}

