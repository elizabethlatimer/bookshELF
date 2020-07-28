import { search as basicSearch } from '../helpers/googleBooksAPI'

class Books {
  static async search(searchString) {
    let booksFound = await basicSearch(searchString);

    let bookData = booksFound.map(book => {
      let smallBook = {};
      smallBook.id = book.id;
      smallBook.title = book.volumeInfo.title;
      smallBook.authors = book.volumeInfo.authors;
      smallBook.book_description = book.volumeInfo.description;
      smallBook.publisher = book.volumeInfo.publisher;
      smallBook.publish_date = book.volumeInfo.publishDate;
      smallBook.thumbnail = book.imageLinks.thumbnail;

      return smallBook;
    });

    return bookData;
  }

  // static async advancedSearch (data) {

  // }
}

module.exports = Books;