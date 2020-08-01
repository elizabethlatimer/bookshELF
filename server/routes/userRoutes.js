/** Routes for collections. */

const User = require("../models/user");
const express = require("express");
const router = new express.Router();

const createToken = require('../helpers/createToken');

//get info for logged in user
router.get('/', async function (req, res, next) {
  try {
    let user = await User.findOne(req.username);
    return res.json({ user });

  } catch (err) {
    return next(err);
  }
});

//post register a new user

router.post("/", async function(req, res, next) {
  try {
    // delete req.body._token;
    // const validation = validate(req.body, userNewSchema);

    // if (!validation.valid) {
    //   return next({
    //     status: 400,
    //     message: validation.errors.map(e => e.stack)
    //   });
    // }

    const newUser = await User.register(req.body);
    const token = createToken(newUser);
    return res.status(201).json({ token });

  } catch (err) {
    return next(err);
  }
});

//put update a user

