const { UserDao } = require("../models/users-model");

class UsersController {

    // problema do singleton
    // getUsersDao() {
    //     return new UserDao();
    // }

    constructor() {
        this.usersDao = new UserDao();
    }

    getUsers(req, res) {
        console.log("GET USERS");
        
        let users = this.usersDao.getUsers(); 
        
        // remover professor (exemplo adicionando regra de negocio)
        users = users.filter(user => !user.professor);
        
        res.render('lista-users', { NUMERO_AULA: '04', users });
    }

}

module.exports = {
    UsersController
}