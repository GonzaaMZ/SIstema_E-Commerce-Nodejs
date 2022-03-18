
const {Router} = require('express');

const { crearPreferencia, redireccion } = require('../controller/pago.controller');


const router = Router();


router.post('/crear_preferencia', crearPreferencia);

router.get('/feedback', redireccion);


module.exports = router;