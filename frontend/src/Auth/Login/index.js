import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const INITIAL_STATE = { email: "", password: "" }

function Login() {

  const [formState, setFormState] = useState(INITIAL_STATE);

  function handleChange(evt) {
    let { name, value } = evt.target;
    setFormState(formData => ({ ...formData, [name]: value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();

  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formEmail">
        <Form.Control
          type="email"
          placeholder={"Email"}
          value={formState.email}
          onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Control
          type="password"
          placeholder={"Password"}
          value={formState.password}
          onChange={handleChange} />
      </Form.Group>

      <Button variant="primary" type="submit">Login</Button>
    </Form>
  )
}

export default Login;