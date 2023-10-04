const { UserDao } = require("../models/users-model");

const bcrypt = require('bcrypt');

class AuthController {

    constructor() {
        this.usersDao = new UserDao();
    }

    async fazLogin(req, res) {

        const { email, senha } = req.body;

        const user = await this.usersDao.findByEmail(email);
        console.log(user)
        if (user) {
            const senhaConfere = bcrypt.compareSync(senha, user.password);
            const userSession = { name: user.name, email: user.email};
            const { password, ...userS } = user;
            req.session.user = userS;
            return res.json({ user, senhaConfere });
        }

        res.send('USUARIO NAO ENCONTRADO');
        

    }

}

module.exports = {
    AuthController
}