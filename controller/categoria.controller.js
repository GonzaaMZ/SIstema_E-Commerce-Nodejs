const { response } = require("express");

const { iniciarTablaCategoria, Categoria } = require("../models/categoria")


const crearCategoria = async (req, res = response) => {

    const {nombre} = req.body;
    
    const data = {
        nombre
    }
    
    try {
        iniciarTablaCategoria();
        const categoria = await Categoria.create(data);
        return res.status(200).json(categoria);

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const actualizarCategoria = async (req, res = response) => {

    const id = req.params.id;
    const body = req.body;

    try {
        const categoria = await Categoria.update(body, {
            where: {
                idCategoria: id
            }
        });

        const categoriaMostrar = await Categoria.findByPk(id);

        return res.status(200).json(categoriaMostrar)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const eliminarCategoria = async (req, res = response) => {

    const id = req.params.id;

    try {
        const categoriaBorrado = await  Categoria.findByPk(id);

        const categoria = await Categoria.destroy({
            where: {
                idCategoria: id
            }
        });

        return res.json({
            msg: 'Categoria borrada',
            categoriaBorrado
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }

}

const obtenerCategorias = async (req, res = response) => {

    const categorias = await Categoria.findAndCountAll();

    return res.json(categorias);
}


module.exports = {
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
    obtenerCategorias
}