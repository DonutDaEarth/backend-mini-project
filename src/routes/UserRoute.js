const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.post('/user_create', userController.create);
router.get('/user_read/:id', userController.read);
router.put('/user_update/:id', userController.update);
router.delete('/user_delete/:id', userController.delete);
router.post('/authenticate', userController.authenticate);

module.exports = router;
