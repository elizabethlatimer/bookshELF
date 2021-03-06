import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import UserContext from '../../utils/userContext';
import { useHistory } from 'react-router-dom';


const INITIAL_STATE = { username: "", password: "" }

function Login() {

  const [formState, setFormState] = useState(INITIAL_STATE);
  const [ alert, setAlert ] = useState(null);
  const { login } = useContext(UserContext);
  const history = useHistory();

  function handleChange(evt) {
    let { name, value } = evt.target;
    setFormState(formData => ({ ...formData, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formState);
      history.push('/library')

    } catch (err) {
      console.error("Login error", err)
      setAlert("Something went wrong, please try again.")
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Control
          type="text"
          placeholder={"Username"}
          name="username"
          value={formState.username}
          onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Control
          type="password"
          placeholder={"Password"}
          name="password"
          value={formState.password}
          onChange={handleChange} />
      </Form.Group>

      <Button variant="primary" type="submit">Login</Button>
      {alert ? <p>{alert}</p> : null}
    </Form>
  )
}

export default Login;