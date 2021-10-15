import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createTodo, updateTodo } from '../views/todoData';

// Create an initial state object
const initialState = {
  name: '',
  complete: false,
  uid: '',
};

export default function TodoForm({ obj, setTodos, setEditItem }) {
  // set the default state to the initialState object
  const [formInput, setFormInput] = useState(initialState);
  // when the component mounts, check if a firebasekey exists. If it does, set the value of formInput to the obj values
  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput({
        name: obj.name,
        firebaseKey: obj.firebaseKey,
        complete: obj.complete,
        date: obj.date,
        uid: obj.uid,
      });
    }
    // render the component if the obj values is different
  }, [obj]);

  // On call of the resetForm function, reset the sate to the initialState
  const resetForm = () => {
    setFormInput({ ...initialState });
    setEditItem({});
  };

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // since we are using this form for both creating updating, we eed to use logic to determine which method to run. If there is a firebaseKey, we know that we are updating.

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTodo(formInput).then((todos) => {
        setTodos(todos);
        resetForm();
      });
    } else {
      createTodo({ ...formInput, date: new Date() }).then((todos) => {
        setTodos(todos);
        resetForm();
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex">
          <label htmlFor="name" className="form-label">
            Name
            <br />
            <input
              className="form-control form-control-lg me-3"
              type="text"
              id="name"
              name="name"
              value={formInput.name}
              onChange={handleChange}
              placeholder="ADD A YOU-DO!"
              required
            />
          </label>
          <button className="btn btn-success" type="submit">
            {obj.firebaseKey ? 'update' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

TodoForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
  setTodos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};

TodoForm.defaultProps = {
  obj: {},
};
