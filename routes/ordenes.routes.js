const {Router} = require('express');

const { crearOrden, eliminarOrden, obtenerOrden, obtenerOrdenes } = require('../controller/orden.controller');


const router = Router();

router.post('/', crearOrden);

router.delete('/:id', eliminarOrden);

router.get('/:id', obtenerOrden);

router.get('/', obtenerOrdenes);




module.exports = router;