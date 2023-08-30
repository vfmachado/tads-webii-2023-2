const { db } = require('../database/db-connection');
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
    // this.users = [
    //     new User('Geraldo'),
    //     { name: 'Victor' },
    //     { name: 'Isa' },
    //     { name: 'Vini', professor: true },
    // ]
  }

  addUser(user) {
    //  this.users.push(user);
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users';
      db.all(sql, [], (err, rows) => {
        if (err) {
          console.log({ err });
        }
        console.log({ rows });
        resolve(rows);
      });
    });

  }
}


module.exports = {
  User,
  UserDao
};
