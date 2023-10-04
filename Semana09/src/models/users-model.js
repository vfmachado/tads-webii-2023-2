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
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      db.run(sql, [user.name, user.email, user.password], (err) => {
        if (err) {
          console.log({ err });
          reject();
        }
        console.log('User created');
        resolve();
      });
    });
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users';
      db.all(sql, [], (err, rows) => {
        if (err) {
          console.log({ err });
        }
        // console.log({ rows });
        resolve(rows);
      });
    });

  }

  getById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE  id = ?';
      db.get(sql, [id], (err, row) => {
        if (err) {
          console.log({ err });
        }
        // console.log({ row });
        resolve(row);
      });
    });
  }

  findByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE  email = ?';
      db.get(sql, [email], (err, row) => {
        if (err) {
          console.log({ err });
        }
        // console.log({ row });
        resolve(row);
      });
    });
  }

  update(user) {
    return new Promise((resolve, reject) => {
      const sql = `
      UPDATE users
      SET name=?, email=?, photo=?
      WHERE id=?;
      `;
      
      db.run(sql, [user.name, user.email, user.image, user.id ], (err, row) => {
        if (err) {
          console.log({ err });
        }
        console.log({ row });
        resolve(row);
      });
    });
  }
}


module.exports = {
  User,
  UserDao
};
