const produitService = require('../services/produit-service');

exports.addProduit = (async (req,res) => {
    try {
        const {designation, prix, categorie,image} = req.body;
        console.log('image',image);
        produit = await produitService.addProduit(designation, prix, categorie,image);
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
        const {id} = req.query;
        console.log('id',id);
        const produit = await produitService.getProduitById(id);
        res.status(200).send(produit);
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la récupération du produit');
    }
})

exports.getProduitByCategorie = (async (req,res) => {
    try {
        const {id} = req.query;
        console.log('id',id);
        const produit = await produitService.getProduitByCategorie(id);
        res.status(200).send(produit);
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la récupération des produits de la catégorie');
    }
}
)

exports.updateProduit = (async (req,res) => {
    try {
        const {id} = req.body;
        console.log('id8UPDATE',id);
        const {designation, prix, categorie,image} = req.body;
        console.log('designation',designation + 'prix',prix + 'categorie',categorie);
        await produitService.updateProduit(id, designation, prix, categorie,image);

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
        console.log('Produit supprimé');
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la suppression du produit');
    }

})



