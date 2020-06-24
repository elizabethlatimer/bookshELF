import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import BookCard from '../shared/BookCard';

const sampleCollection = {
  id: 1,
  name: "Test",
  description: "Test Description",
  books: [
    {id: 1, title: "Test Book", img: "https://marketplace.canva.com/EAD7WWWtKSQ/1/0/251w/canva-purple-and-red-leaves-illustration-children%27s-book-cover-hNI7HYnNVQQ.jpg"},
    {id: 2, title: "Test Book", img: "https://marketplace.canva.com/EAD7WWWtKSQ/1/0/251w/canva-purple-and-red-leaves-illustration-children%27s-book-cover-hNI7HYnNVQQ.jpg"},
    {id: 3, title: "Test Book", img: "https://marketplace.canva.com/EAD7WWWtKSQ/1/0/251w/canva-purple-and-red-leaves-illustration-children%27s-book-cover-hNI7HYnNVQQ.jpg"},
    {id: 4, title: "Test Book", img: "https://marketplace.canva.com/EAD7WWWtKSQ/1/0/251w/canva-purple-and-red-leaves-illustration-children%27s-book-cover-hNI7HYnNVQQ.jpg"},
    {id: 5, title: "Test Book", img: "https://marketplace.canva.com/EAD7WWWtKSQ/1/0/251w/canva-purple-and-red-leaves-illustration-children%27s-book-cover-hNI7HYnNVQQ.jpg"},
  ]}

function Collection() {
  const {id} = useParams();
  let [collection, setCollection] = useState(sampleCollection);

  //make call to backend for collection by id
  // useEffect(()=> {

  // }, [])

  if(!collection) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <h3>{collection.name}</h3>
      <p>{collection.description}</p>
      <Row>
        {collection.books.map(book => <BookCard key={book.id} book={book} />)}
      </Row>
    </Container>
  )
}

export default Collection;