const { UserDao } = require("../models/users-model");

class UsersController {

    // problema do singleton
    // getUsersDao() {
    //     return new UserDao();
    // }

    constructor() {
        this.usersDao = new UserDao();
    }

    async getUsers(req, res) {
        console.log("GET USERS");
        
        let users = await this.usersDao.getUsers(); 
        
        // remover professor (exemplo adicionando regra de negocio)
        users = users.filter(user => !user.professor);
        
        res.render('lista-users', { users });
    }

    createUser(req, res) {
        console.log('Create user');
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            // TODO TAREFA - PAGINA DE CRIACAO INDICANDO OS ERROS NO FORMULARIO
            res.status(400).send('Bad request - missing parameters');
            return;
        }

        const user = {
            name,
            email,
            password
        };

        this.usersDao.addUser(user);
        res.redirect('/users');
        // res.send('OK - create user\n' + JSON.stringify(req.body));/
    }

}

module.exports = {
    UsersController
}