const { formidable } = require('formidable');

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

    async createUser(req, res) {
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

        await this.usersDao.addUser(user);
        res.redirect('/users');
        // res.send('OK - create user\n' + JSON.stringify(req.body));/
    }


    async pageEditUser(req, res) {
        const { id } = req.params;

        const user = await this.usersDao.getById(id);
        
        res.render('edit-user', { user })
    }


    async editUserV1(req, res) {

        const { id } = req.params;

        const form = formidable({
            uploadDir: 'public/uploads'
        });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }

            let name, email, image;
            name = fields.name[0];
            email = fields.email[0];
            image = files.image_upload[0].newFilename;

            await this.usersDao.update({id, name, email, image});

            res.json({ name, email, image });
        });


    }

}

module.exports = {
    UsersController
}