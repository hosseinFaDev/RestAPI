const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const authentication = require('../middlewares/authentication');
router.get('/',[authentication],userController.userList);
router.post('/',userController.addUser);
router.get('/:id',[authentication],userController.getUser);
router.delete('/:id',[authentication],userController.userRemove);
router.put('/:id',[authentication],userController.userUpdate);
router.patch('/:id',[authentication],userController.userUpdate);

module.exports = router;