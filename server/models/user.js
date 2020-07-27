const db = require('../db');
const bcrypt = require("bcrypt");

class User {
  static async register(data) {
    //check username for duplicates

    //hash password

    //insert into users table

    //return user info

  }

  static async authenticate(data) {
    //try to get the user

    //if the user exists, use bcrypt to compare password with hashed password

    //if valid credentials, return user object

    //if the user doesn't exist, or password is invalid, throw invalid credentials error

  }

  static async update(username, data) {
    //confirm password, throw error if incorrect

    //if password is being changed, hash new password

    //update user (use helper to create sql query for partial update)

    //return updated user

  }

  static async findOne(username) {
    //get info on username
    //return user

  }

  static async remove(username) {
    //delete user
    //throw error if user doesn't exist
    //return undefined

  }
}