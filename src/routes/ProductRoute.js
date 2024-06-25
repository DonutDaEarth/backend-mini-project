const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.post('/product_create', productController.create);
router.post('/product_create/multiple', productController.createMulti);
router.get('/product_read/:id', productController.read);
router.get('/product_read', productController.readAll);
router.get('/product_read/multiple', productController.readMulti);
router.put('/product_update/:id', productController.update);
router.delete('/product_delete/:id', productController.delete);
router.delete('/product_delete/multiple', productController.deleteMulti);

module.exports = router;
