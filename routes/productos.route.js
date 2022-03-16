const {Router} = require('express');

const { crearProducto, actualizarProducto, borrarProducto, obtenerProductos, obtenerProductoById } = require('../controller/producto.controller');

const router = Router();

router.post('/', crearProducto);

router.put('/:id', actualizarProducto);

router.delete('/:id', borrarProducto);

router.get('/', obtenerProductos);

router.get('/:id', obtenerProductoById);




module.exports = router;