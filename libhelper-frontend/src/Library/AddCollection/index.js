import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';

const INITIAL_STATE = {
  name: '',
  description: '',
}

function AddCollection({cancelAdd}) {
  const [formData, setFormData] = useState(INITIAL_STATE);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData, [name]: value
    }));
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    cancelAdd();

  }

  return (
    <Form>
      <Form.Group controlId="collectionName">
        <Form.Label>Collection Name</Form.Label>
        <Form.Control type="text" value={formData.name} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="collectionDesc">
        <Form.Label> Description</Form.Label>
        <Form.Control type="text" value={formData.description} onChange={handleChange} />
      </Form.Group>
      <Button variant='outline-secondary' onClick={cancelAdd}>Cancel</Button>
      <Button variant="primary" onClick={handleSubmit}>AddCollection</Button>
    </Form>
  )

}

export default AddCollection;