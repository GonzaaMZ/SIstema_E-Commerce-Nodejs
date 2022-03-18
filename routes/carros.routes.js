const {Router} = require('express');

const { eliminarCarro, eliminarProductoCarro, agregarProductoCarro, obtenerCarro, obtenerCarros } = require('../controller/carro.controller');

const router = Router();

router.post('/', agregarProductoCarro);

router.put('/', eliminarProductoCarro);

router.delete('/:id', eliminarCarro);

router.get('/:id', obtenerCarro)

router.get('/', obtenerCarros)





module.exports = router;