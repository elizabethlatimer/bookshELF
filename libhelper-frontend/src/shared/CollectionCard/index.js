import React from 'react';
import './CollectionCard.scss';

import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function CollectionCard({ collection }) {
  const { name, number, description, id } = collection;
  const history = useHistory();

  function handleClick(id) {
    history.push(`/collection/${id}`);
  }

  return (
    <Card
      className='collection my-2 mx-2 col-10 col-sm-10 col-md-4 col-lg-4 col-xl-3'
      onClick={()=>handleClick(id)}>
      <Card.Body>
        <Card.Title className="mb-0">{name}</Card.Title>
        <Card.Text className="mt-0"><small className="text-muted">{number} books</small></Card.Text>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default CollectionCard;