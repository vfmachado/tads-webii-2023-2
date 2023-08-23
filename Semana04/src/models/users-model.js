
class User {
    constructor(name, stack) {
        this.name = name;
        this.stack = stack;
    }
}

// REPOSITORY
// DAO - Data Access Object
class UserDao {
    // IN MEMORY DATABASE
    constructor() {
        this.users = [
            new User('Geraldo'),
            { name: 'Victor' },
            { name: 'Isa' },
            { name: 'Vini', professor: true },
        ]
    }

    addUser(user) {
        this.users.push(user);
    }

    getUsers() {
        return this.users;
    }
}


module.exports = {
    User,
    UserDao
};
