const panierService = require('../services/panier-service.js');

exports.addPanier = (async (req,res) => {
    try {
        const {mail_user, id_produit, quantite} = req.body;
        produit = await panierService.addPanier(mail_user, id_produit, quantite);
        res.status(200).send('Produit ajouté');
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de l ajout du produit');
    }
})

exports.getPanier = (async (req,res) => {
    try {
        const {mail_user} = req.body;
        const panier = await panierService.getPanier(mail_user);
        res.status(200).send(panier);
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la récupération du panier');
    }
})

exports.deletePanier = (async (req,res) => {
    try {
        const {mail_user, id_produit} = req.body;
        await panierService.deletePanier(mail_user, id_produit);
        res.status(200).send('Produit supprimé');
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la suppression du produit');
    }
})

exports.deleteAllPanier = (async (req,res) => {
    try {
        const {mail_user} = req.body;
        await panierService.deleteAllPanier(mail_user);
        res.status(200).send('Panier supprimé');
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la suppression du panier');
    }
})