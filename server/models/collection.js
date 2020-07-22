const db = require('../db');

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
      const error = new Error(`Collection not found`);
      error.status = 404;   // 404 NOT FOUND
      throw error;
    }

    let books = await db.query(
      `SELECT title, author, book_description, publisher, published_year, personal_notes, loaned, personal_rating
        FROM books JOIN users_books ON book_id = id
        WHERE collection_id = $1`,
        [id]
    );

    collection.books = books.rows;

    return collection;

  }

  static async create(username, title, description) {
    let collection = await db.query(
      `INSERT INTO collections (collection_title, collection_description)
        VALUES ($1, $2)
        RETURNING id, collection_title, collection_description`,
      [title, description]
    );

    db.query(
      `INSERT INTO users_collections (username, collection_id)
        VALUES ($1, $2)`, [username, collection.rows[0].id]
    )

    return collection.rows[0];

  }

  static async addBook(book) {
    let [id, title, author, book_description, publisher, published_year]

  }

}