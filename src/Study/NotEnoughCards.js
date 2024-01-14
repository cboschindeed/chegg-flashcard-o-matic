import React from "react";
import { Link } from "react-router-dom";

const NotEnoughCards = ({ deckId }) => {
  return (
    <div>
      <h3 className="text-danger">Not enough cards.</h3>
      <p>You need at least 3 cards to study. There are 2 cards in this deck.</p>
      <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
        <i className="bi bi-plus-lg"></i> Add Cards
      </Link>
    </div>
  );
};

export default NotEnoughCards;
