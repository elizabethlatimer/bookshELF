import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import UserContext from '../../utils/userContext';

const INITIAL_STATE = {
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function Signup() {

  const [formState, setFormState] = useState(INITIAL_STATE);
  const { create } = useContext(UserContext);
  const history = useHistory();

  function handleChange(evt) {
    let { name, value } = evt.target;
    setFormState(formData => ({ ...formData, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await create(formState);
      history.push('/library');

    } catch(err) {
      console.error("Something went wrong", err)
    }

  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Control
          name="username"
          placeholder={"Username"}
          value={formState.username}
          onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="first_name">
        <Form.Control
          name="first_name"
          placeholder={"First Name"}
          value={formState.first_name}
          onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="last_name">
        <Form.Control
          name="last_name"
          placeholder={"Last Name"}
          value={formState.last_name}
          onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Control
          name="email"
          type="email"
          placeholder={"Email"}
          value={formState.email}
          onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Control
          name="password"
          type="password"
          placeholder={"Password"}
          value={formState.password}
          onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="confirmPassword">
        <Form.Control
          name="confirmPassword"
          type="password"
          placeholder={"Confirm Password"}
          value={formState.confirmPassword}
          onChange={handleChange} />
      </Form.Group>

      <Button variant="primary" type="submit">Register</Button>
    </Form>
  )
}

export default Signup;