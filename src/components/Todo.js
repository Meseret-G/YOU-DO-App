import React from 'react';
import PropTypes from 'prop-types';
import { deleteTodo, updateTodo } from '../views/todoData';

export default function Todo({ taco, setTodos, setEditItem }) {
  const handleClick = (method) => {
    if (method === 'delete') {
      deleteTodo(taco.firebaseKey).then(setTodos);
    } else {
      updateTodo({ ...taco, complete: true }).then(setTodos);
    }
  };
  return (
    <>
      <div
        className="d-flex justify-content-between alert alert-light"
        role="alert"
      >
        {taco.complete ? (
          <button className="btn btn-success" type="button" disabled>
            <i className="fas fa-check-circle fa-2x" />
          </button>
        ) : (
          <button
            onClick={() => handleClick('complete')}
            className="btn btn-success"
            type="button"
          >
            COMPLETE
          </button>
        )}
        <h5>{taco.name}</h5>
        <div>
          {!taco.complete && (
            <button
              onClick={() => setEditItem(taco)}
              className="btn btn-info"
              type="button"
            >
              EDIT
            </button>
          )}
        </div>
        <button
          onClick={() => handleClick('delete')}
          className="btn btn-danger"
          type="button"
        >
          DELETE
        </button>
      </div>
    </>
  );
}

Todo.propTypes = {
  taco: PropTypes.shape({
    name: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  setTodos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
