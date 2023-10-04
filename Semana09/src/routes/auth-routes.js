const { Router} = require('express');
const { AuthController } = require('../controllers/auth-controller');
const router = Router();

const authController = new AuthController();

router.post('/login', (req, res) => {
    authController.fazLogin(req, res);
});

module.exports = { authRoutes: router }
