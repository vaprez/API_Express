const categorieSerfvice = require('../services/categorie-service');

exports.addCategorie = (async (req,res) => {
    try {
        const {designation,image} = req.body;
        categorie = await categorieSerfvice.addCategorie(designation,image);
        // res.status(200).send('Categorie ajoutée');
        res.status(200).json({ categorie: categorie });
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de l ajout de la categorie');
    }
})

exports.getCategorie = (async (req,res) => {
    try {
        const categorie = await categorieSerfvice.getCategorie();
        res.status(200).send(categorie);
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la récupération des categories');
    }
})

exports.getCategorieById = (async (req,res) => {
    try {
        const {id} = req.query;
        const categorie = await categorieSerfvice.getCategorieById(id);
        res.status(200).send(categorie);
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la récupération de la categorie');
    }
})

exports.updateCategorie = (async (req,res) => {
    try {
        const {id} = req.body;
        const {designation,image} = req.body;
        const categorie = await categorieSerfvice.updateCategorie(id, designation,image);
        res.status(200).send(categorie);
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la modification de la categorie');
    }
})

exports.deleteCategorie = (async (req,res) => {
    try {
        const {id} = req.body;
        await categorieSerfvice.deleteCategorie(id);
        res.status(200).send('Categorie supprimée');
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la suppression de la categorie');
    }
})

