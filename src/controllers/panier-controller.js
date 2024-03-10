const panierService = require('../services/panier-service.js');

exports.addPanier = (async (req,res) => {
    try {
        const {token, id_produit,designation,prix, quantite} = req.body;
        console.log("controller",token);
        produit = await panierService.addPanier(token, id_produit,designation,prix, quantite);
        res.status(200).send('Produit ajouté');
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de l ajout du produit');
    }
})

exports.getPanier = (async (req,res) => {
    try {
        const {token} = req.query;
        const panier = await panierService.getPanier(token);
        res.status(200).send(panier);
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la récupération du panier');
    }
})

exports.deletePanier = (async (req,res) => {
    try {
        const {token, id_produit} = req.body;
        
        await panierService.deletePanier(token, id_produit);
        res.status(200).send('Produit supprimé');
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la suppression du produit');
    }
})

exports.deleteAllPanier = (async (req,res) => {
    try {
        const {token} = req.body;
        console.log("controller",token);
        await panierService.deleteAllPanier(token);
        res.status(200).send('Panier supprimé');
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la suppression du panier');
    }
})