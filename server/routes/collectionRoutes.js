/** Routes for collections. */

const Collection = require("../models/collection");
const express = require("express");
const router = new express.Router();

//get all collections for a user

router.get('/', async function (req, res, next) {
  try {
    let collections = await Collection.getAllByUser(req.username);

    return res.json({ collections });

  } catch (err) {
    return next(err);
  }

});

//get collection by id
//{collection: {collection_title, collection_description, books: []}}

router.get('/:id', async function (req, res, next) {
  try {
    let collection = await Collection.getOne(req.params.id);
    return res.json({ collection });

  } catch (err) {
    return next(err);
  }
});

//post new collection

router.post('/', async function (req, res, next) {
  try {
    //TODO make and validate with jsonschema

    let collection = await Collection.create(req.username, req.body);

    return res.json({ collection });

  } catch (err) {
    return next(err);
  }
});

//post new book to collection

router.post('/:id', async function (req, res, next) {
  try {
    //TODO made and validate req.body with json schema
    await Collection.addBookToCollection(req.username, req.params.id, req.body);

    return res.status(201).json({ message: `Successfully added book to collection.` });

  } catch (err) {
    return next(err);
  }
});

//put modify collection title/description

router.put('/:id', async function (req, res, next) {
  try {
    //validate body with jsonschema
    let update = await Collection.updateCollection(req.params.id, req.body);
    return res.json({update})

  } catch (err) {
    return next(err);
  }
})


module.exports = router;