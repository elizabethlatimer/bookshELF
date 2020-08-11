const db = require('../db');
const bcrypt = require("bcrypt");

const expressError = require('../helpers/expressError');
const partialUpdate = require('../helpers/partialUpdate');
const { BCRYPT_WORK_FACTOR } = require('../config');

class User {
  static async register(data) {
    let duplicateCheck = await db.query(
      `SELECT username FROM users
        WHERE username = $1`, [data.username]
    );

    if (duplicateCheck.rows[0]) {
      throw new expressError(`Username not available`, 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);

    let result = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, email)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING username, password, first_name, last_name, email`,
      [data.username, hashedPassword, data.first_name, data.last_name, data.email]
    );
    console.log("new user", result.rows[0])

    return result.rows[0];
  }

  static async authenticate(data) {
    const result = await db.query(
      `SELECT username, password, first_name, last_name, email
        FROM users
        WHERE username = $1`,
      [data.username]);

    const user = result.rows[0];

    if (user) {
      let validUser = await bcrypt.compare(data.password, user.password);
      if (validUser) return user;
    }

    throw new expressError("Invalid Credentials", 401)

  }

  static async update(username, password, data) {
    const result = await db.query(
      `SELECT username, password
        FROM users
        WHERE username = $1`,
      [username]);

    const user = result.rows[0];

    let validUser = await bcrypt.compare(password, user.password);

    if (validUser) {
      if (data.newPassword) {
        let hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        data.password = hashedPassword;
        delete data.newPassword
      }

      let { query, values } = partialUpdate(
        "users",
        data,
        "username",
        username
      );

      const result = await db.query(query, values);
      const updatedUser = result.rows[0];

      delete updatedUser.password;

      return updatedUser;
    }
    throw new expressError("Invalid password", 401);
  }

  static async findOne(username) {
    const result = await db.query(
      `SELECT username, first_name, last_name, email
        FROM users
        WHERE username = $1`,
      [username]);

    return result.rows[0];
  }

}

module.exports = User;