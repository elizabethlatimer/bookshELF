DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_books;
DROP TABLE IF EXISTS collections;

CREATE TABLE books (
    id text PRIMARY KEY,
    title text NOT NULL,
    author text NOT NULL,
    book_description text NOT NULL,
    publisher text,
    published_year text,
);

CREATE TABLE users (
    username text PRIMARY KEY
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL
)

CREATE TABLE users_books (
    book_id text NOT NULL REFERENCES books (id),
    username text NOT NULL REFERENCES users (username),
    collection_id integer NOT NULL REFERENCES collections (id),
    personal_notes text,
    loaned boolean NOT NULL DEFAULT false,
    personal_rating integer,
);

CREATE TABLE collections (
    id SERIAL PRIMARY KEY,
    collection_title text NOT NULL,
    collection_description text,
)

CREATE TABLE users_collections (
    username text NOT NULL REFERENCES users(username),
    collection_id integer NOT NULL REFERENCES collections,
);