import React from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonGroup } from 'reactstrap';

export default function Navigation() {
  const history = useHistory();

  return (
    <div className="text-center mb-3">
      <ButtonGroup size="lg">
        <button
          onClick={() => history.push('/All')}
          type="button"
          className="btn btn-light border border-dark"
        >
          All Todos
        </button>
        <button
          onClick={() => history.push('/Home')}
          type="button"
          className="btn btn-light border border-dark"
        >
          Home
        </button>
        <button
          onClick={() => history.push('/completed')}
          type="button"
          className="btn btn-light border border-dark"
        >
          Completed Todos
        </button>
      </ButtonGroup>
    </div>
  );
}
