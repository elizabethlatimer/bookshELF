import React from 'react';
import { useHistory } from 'react-router-dom';

function BookCard({book}) {
  const history = useHistory();

  handleClick(id) {
    history.push(`/book/${id}`);
  }


}

export default BookCard;