import React from "react";
import { Link } from "react-router-dom";

function DecksList({ decks }) {
  if (decks) {
    return (
      <>
        {decks.map((deck) => (
          <div className="card deck" key={deck.id}>
            <div className="card-body">
              <h5 className="card-title">{deck.name}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {deck.cards.length} {deck.cards.length === 1 ? "card" : "cards"}
              </h6>
              <p className="card-text">{deck.description}</p>
            </div>
            <div>
              <Link to="/decks/:deckId" className="btn btn-secondary">
                <i className="bi bi-eye-fill"></i> View
              </Link>
              <Link to="/decks/:deckId/study" className="btn btn-primary">
                <i className="bi bi-book-half"></i> Study
              </Link>
              <Link to="#" className="btn btn-danger">
                <i className="bi bi-trash-fill"></i>
              </Link>
            </div>
          </div>
        ))}
      </>
    );
  } // if

  return <p>Loading...</p>;
}

export default DecksList;
