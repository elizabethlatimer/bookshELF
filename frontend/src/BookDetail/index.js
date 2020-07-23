import React from 'react';
import { useParams } from 'react-router-dom';

import './BookDetail.scss';

const sampleBook = {
  title: "Silmarillion",
  description: "Tales and legends chronicling the world's beginnings and the happenings of the First Age set the stage for Tolkien's other classic works and focus on the theft of the Elves' jewels by Morgoth, first dark Lord of Middle-earth. Reissue.",
  author: "J.R.R. Tolkien",
  publisher: "Publisher Name",
  publishDate: "1997",
  image: "http://books.google.com/books/content?id=uFKaXu23ovoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  status: "loaned",
  loanee: "jesse",
  notes: "I love this book or would recommend it for blab",
  collections: ["test1", "test2"]
}

function BookDetail() {
  const { id } = useParams();


  //useEffect to either retrieve book from store or database

  return (
    <div className="BookInfoStandard">
      <div><img src={sampleBook.image} /></div>
      <div>
        <table>
          <tbody>
            <tr>
              <td>Title</td>
              <td>{sampleBook.title}</td>
            </tr>
            <tr>
              <td>Author</td>
              <td>{sampleBook.author}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{sampleBook.description}</td>
            </tr>
            <tr>
              <td>Publisher</td>
              <td>{sampleBook.publisher}</td>
            </tr>
            <tr>
              <td>Publish Year</td>
              <td>{sampleBook.publishDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BookDetail;