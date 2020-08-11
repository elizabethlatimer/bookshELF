const db = require('../db');

const expressError = require('../helpers/expressError');
const partialUpdate = require('../helpers/partialUpdate');

class Collection {
  static async getAllByUser(username) {
    let collections = await db.query(
      `SELECT id, collection_title, collection_description
        FROM collections JOIN users_collections on collection_id = id
        WHERE username = $1`,
      [username]
    );

    return collections.rows;
  }

  static async getOne(id) {
    let collectionRes = await db.query(
      `SELECT collection_title, collection_description
        FROM collections
        WHERE id = $1`,
      [id]
    )

    let collection = collectionRes.rows[0];

    if (!collection) {
      throw new expressError(`Collection not found`, 404);
    }

    let books = await db.query(
      `SELECT title, authors, book_description, publisher, published_year, thumbnail, personal_notes, loaned, personal_rating
        FROM books JOIN users_books ON book_id = id
        WHERE collection_id = $1`,
      [id]
    );

    collection.books = books.rows;

    return collection;

  }

  static async create(username, data) {
    console.log(data)
    let collection = await db.query(
      `INSERT INTO collections (collection_title, collection_description)
        VALUES ($1, $2)
        RETURNING id, collection_title, collection_description`,
      [data.title, data.description]
    );

    await db.query(
      `INSERT INTO users_collections (username, collection_id)
        VALUES ($1, $2)`, [username, collection.rows[0].id]
    )

    return collection.rows[0];

  }

  static async addBookToCollection(username, collection_id, book) {
    let [id,
      title,
      authors,
      book_description,
      publisher,
      published_year,
      thumbnail,
      personal_notes,
      loaned,
      personal_rating] = book;

    let inCollection = await db.query(
      `SELECT username FROM users_books
        WHERE book_id = $1 AND collection_id = $2`,
        [id, collection_id]
    );

    if (inCollection.rows[0]) {
      throw new expressError(
        `This book has already been added to this collection`, 409);
    }

    await db.query(
      `INSERT INTO users_books (book_id, username, collection_id, personal_notes, loaned, personal_rating)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [id, username, collection_id, personal_notes, loaned, personal_rating]
    )

    let inBooks = await db.query(
      `SELECT title FROM books
        WHERE id = $1`, [id]
    );

    if (!inBooks.rows[0]) {
      await db.query(
        `INSERT INTO books (id, title, authors, book_description, publisher, published_year, thumbnail)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id`,
          [id, title, authors, book_description, publisher, published_year,thumbnail]
      );
    }
  }

  static async updateCollection(id, data) {
    let result = await db.query(
      `UPDATE collections
        SET collection_title = $1, collection_description = $2
        WHERE id = $3
        RETURNING *`,
        [data.title, data.description, id]
    )

    return result.rows[0]
  }

}

module.exports = Collection;