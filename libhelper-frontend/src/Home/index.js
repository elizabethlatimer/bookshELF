import React, { useState } from 'react';
import { Card, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Home.scss';
import background from '../shared/images/background-home.jpg'

function Home() {
  console.log("rendering home")

  return (
    <div className="Home">
      <img src={background}
        alt="books lying open layered across floor" />
      <Container className="mt-5">
        <Card className="col-md-8 offset-md-2">
          <Card.Header className="mt-4" as="h5">
            Welcome to bookshELF, your helpful home library friend.
          </Card.Header>
          <Card.Body>
            <p>Whether you're looking for a way to keep track of books you own for quick reference,
            you need a way to keep track of who has borrowed your books, or you just love making
          lists of books, you've come to the right place.</p>
            <Link to="/signup" className="btn btn-primary">Sign up for free</Link>
            <br />
            <Link to="/login" className="btn btn-link">Login</Link>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default Home;