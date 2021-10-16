import React, { useEffect, useState } from 'react';
import { deleteTodo, getAllTodos } from './todoData';

export default function All() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getAllTodos().then(setTodos);
  }, []);

  const handleClick = (key) => {
    deleteTodo(key).then(setTodos);
  };
  return (
    <div>
      {todos.map((todo) => (
        <div
          key={todo.firebaseKey}
          className="d-flex justify-content-between alert alert-light"
          role="alert"
        >
          {todo.name}
          <button
            onClick={() => handleClick(todo.firebaseKey)}
            className="btn btn-danger"
            type="button"
          >
            DELETE
          </button>
          <button
            onClick={() => handleClick(todo.firebaseKey)}
            className="btn btn-success"
            type="button"
          >
            COMPLETE
          </button>
        </div>
      ))}
    </div>
  );
}
