import React from "react";
import { Link } from "react-router-dom";

function Flashcard({ card, url }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{card.front}</h5>
        <p className="card-text">{card.back}</p>
        <Link
          to={`${url}/cards/${card.id}/edit`}
          className="btn btn-secondary mr-2"
        >
          <i className="bi bi-pencil-fill"></i> Edit
        </Link>
        <button className="btn btn-danger">
          <i className="bi bi-trash-fill"></i>
        </button>
      </div>
    </div>
  );
}

export default Flashcard;
