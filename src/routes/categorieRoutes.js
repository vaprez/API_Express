const express = require('express')
const router = express.Router()
const { addCategorie, getCategorieById, updateCategorie ,getCategorie, deleteCategorie } = require('../controllers/categorie-controller.js');
const { validateField, validate } = require('../middlewares/sanitizeInput');
const { verifyTokenBlacklist } = require('../middlewares/verifyAuthorisation');



router.post('/addCategorie',[validateField('designation'),verifyTokenBlacklist, validate], addCategorie);
router.get('/getCategorie', [verifyTokenBlacklist], getCategorie);
router.get('/getCategorieById',[validateField('id'),verifyTokenBlacklist], getCategorieById);
router.put('/updateCategorie',[validateField('id','designation'), verifyTokenBlacklist, validate], updateCategorie);
router.delete('/deleteCategorie',[validateField('id'),verifyTokenBlacklist], deleteCategorie);

module.exports = router;