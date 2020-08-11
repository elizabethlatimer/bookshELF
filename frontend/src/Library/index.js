import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';

import CollectionCard from '../shared/CollectionCard';
import AddCollection from './AddCollection';
import backendAPI from '../utils/backendAPI';
import UserContext from '../utils/userContext';


function Library() {
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const { collections, setCollections } = useContext(UserContext);

  function showForm() {
    setAdding(true);
  }

  function hideForm() {
    setAdding(false);
  }

  async function addToCollections(title, description) {
    let newCollection = { title: title, description: description };
    let res = await backendAPI.newCollection(newCollection);
    setCollections(cState => {
      return {...cState, collections: [...cState.collections, res.collection]}
    })


  }

  async function getCollections() {
    let fetchedCollections = await backendAPI.getCollectionsByUser();
    setCollections(cState => {
      return { collections: fetchedCollections }
    });

  }

  useEffect(() => {
    getCollections();
    setLoading(false);
  }, [])

  return (
    <Container className="mt-2">
      <h3>Collections</h3>
      {loading ? "Loading..." :
        <Row className="justify-content-center">
          {collections.collections ? collections.collections.map(collection => {
            return <CollectionCard key={collection.id} collection={collection} />
          }) : <Col>"You don't have any collections yet"</Col>}
        </Row>}
      {!adding
        ? <Button variant="primary" onClick={showForm}>Add a Collection</Button>
        : <AddCollection closeForm={hideForm} addCollection={addToCollections} />}
    </Container>
  )

}

export default Library;