const produitService = require('../services/produit-service');

exports.addProduit = (async (req,res) => {
    try {
        const {designation, prix, categorie} = req.body;
        produit = await produitService.addProduit(designation, prix, categorie);
        res.status(200).send('Produit ajouté');
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de l ajout du produit');
    }
})


exports.getProduit = (async (req,res) => {
    try {
        const produit = await produitService.getProduit();
        res.status(200).send(produit);
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la récupération des produits');
    }
})

exports.getProduitById = (async (req,res) => {
    try {
        const {id} = req.body;
        const produit = await produitService.getProduitById(id);
        res.status(200).send(produit);
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la récupération du produit');
    }
})

exports.updateProduit = (async (req,res) => {
    try {
        const {id} = req.body;
        console.log('id',id);
        const {designation, prix, categorie} = req.body;
        await produitService.updateProduit(id, designation, prix, categorie);
        res.status(200).send('Produit modifié'  + 'designation : ' + designation + ' prix : ' + prix + ' categorie :' + categorie );
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la modification du produit');
    }
})

exports.deleteProduit = (async (req,res) => {
    try {
        const {id} = req.body;
        await produitService.deleteProduit(id);
        res.status(200).send('Produit supprimé');
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la suppression du produit');
    }

})



