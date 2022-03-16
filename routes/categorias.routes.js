const {Router} = require('express');

const { crearCategoria, actualizarCategoria, eliminarCategoria, obtenerCategorias } = require('../controller/categoria.controller');


const router = Router();

router.post('/', crearCategoria);

router.put('/:id', actualizarCategoria);

router.delete('/:id', eliminarCategoria);

router.get('/', obtenerCategorias);





module.exports = router;