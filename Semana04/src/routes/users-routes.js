const { Router} = require('express');
const router = Router();

const { UsersController } = require('../controllers/users-controller');

const userController = new UsersController();

router.get('/users', (req, res) => userController.getUsers(req, res));

// multiplas rotas..
// algumas rotas com middlewares diferentes das outras
// algumas com validacao

module.exports = {
    usersRouter: router
};