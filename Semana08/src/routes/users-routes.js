const { Router} = require('express');
const router = Router();

const { UsersController } = require('../controllers/users-controller');

const userController = new UsersController();

// chamada http para /users
// vem com um payload possivelmente
router.get('/users', (req, res) => userController.getUsers(req, res));

router.post('/users', (req, res) => userController.createUser(req, res));

router.get('/users/:id', (req, res) => userController.pageEditUser(req, res));
router.post('/users/:id', (req, res) => userController.editUserV1(req, res));

// multiplas rotas..
// algumas rotas com middlewares diferentes das outras
// algumas com validacao

module.exports = {
    usersRouter: router
};