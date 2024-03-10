const express = require('express');
const { verifyTokenBlacklist } = require('../middlewares/verifyAuthorisation');
const router = express.Router();

const { addPanier, getPanier, deletePanier,deleteAllPanier } = require('../controllers/panier-controller');
const { validateField } = require('../middlewares/sanitizeInput');


router.post('/addPanier', [validateField('token', 'id_produit'), verifyTokenBlacklist], addPanier);
router.get('/getPanier', [verifyTokenBlacklist], getPanier);
router.delete('/deleteProduitPanier', [ verifyTokenBlacklist], deletePanier);
router.delete('/deleteAllPanier', [validateField('mail_user'), verifyTokenBlacklist], deleteAllPanier);

module.exports = router;