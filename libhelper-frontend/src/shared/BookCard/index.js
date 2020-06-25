import React from 'react';
import { useHistory } from 'react-router-dom';
import {Card} from 'react-bootstrap'

function BookCard({book}) {
  const history = useHistory();

  function handleClick(id) {
    history.push(`/book/${id}`);
  }

  return (
    <Card className="book mx-2 my-2 col-3 px-0" onClick={() => handleClick(book.id)}>
      <Card.Img variant="top" src={book.img} />
      <Card.Body className="my-0">
        <Card.Title className="my-0">{book.title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default BookCard;