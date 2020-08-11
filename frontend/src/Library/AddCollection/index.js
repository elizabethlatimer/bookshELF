import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';

const INITIAL_STATE = {
  title: '',
  description: '',
}

function AddCollection({closeForm, addCollection}) {
  const [formData, setFormData] = useState(INITIAL_STATE);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData, [name]: value
    }));
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    addCollection(formData.title, formData.description);
    console.log(formData)
    closeForm();
  }

  return (
    <Form>
      <Form.Group controlId="collectionName">
        <Form.Label>Collection Name</Form.Label>
        <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="collectionDesc">
        <Form.Label> Description</Form.Label>
        <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} />
      </Form.Group>
      <Button variant='outline-secondary' onClick={closeForm}>Cancel</Button>
      <Button variant="primary" onClick={handleSubmit}>AddCollection</Button>
    </Form>
  )

}

export default AddCollection;