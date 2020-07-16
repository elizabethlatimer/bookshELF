import React, {useState} from 'react';
import { Container, Row, Button } from 'react-bootstrap';

import CollectionCard from '../shared/CollectionCard';
import AddCollection from './AddCollection';

const dummyCollectionList = [
  {name: "List One", number: 16, description: "This is a list of books", id: 1},
  {name: "List Two", number: 16, description: "This is a list of books", id: 2},
  {name: "List Three", number: 16, description: "This is a list of books", id: 3}]

let tempID = 4;

function Library() {
  const [adding, setAdding] = useState(false);

  function showForm() {
    setAdding(true);
  }

  function hideForm() {
    setAdding(false);
  }

  function addToCollections(title, description) {
    let newCollection = {name: title, number: 0, description: description, id: tempID};
    tempID++;
    dummyCollectionList.push(newCollection);
  }

  return (
    <Container className="mt-2">
    <h3>Collections</h3>
    <Row className="justify-content-center">
      {dummyCollectionList.map(collection => {
        return <CollectionCard key={collection.id} collection={collection} />
      })}
    </Row>
    {!adding
    ?<Button variant="primary" onClick={showForm}>Add a Collection</Button>
    : <AddCollection closeForm={hideForm} addCollection={addToCollections} />}
    </Container>
  )

}

export default Library;