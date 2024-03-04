const express = require('express')
const router = express.Router()
const { validateField, validate } = require('../middlewares/sanitizeInput.js');
const { addProduit, getProduit, getProduitById, updateProduit, deleteProduit } = require('../controllers/produit-controller.js');
const { verifyTokenBlacklist } = require('../middlewares/verifyAuthorisation.js');


router.post('/addProduit',[validateField('designation'), validateField('prix'), validateField('categorie'),verifyTokenBlacklist, validate], addProduit);
router.get('/getProduit', getProduit);
router.get('/getProduitById',[verifyTokenBlacklist], getProduitById);
router.put('/updateProduit',[verifyTokenBlacklist], updateProduit);
router.delete('/deleteProduit',[verifyTokenBlacklist], deleteProduit);

module.exports = router;