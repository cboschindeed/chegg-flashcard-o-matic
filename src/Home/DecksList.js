import React from "react";
import { Link } from "react-router-dom";

// countCards will return the number of cards associated with each deck
function countCards({ cards, deckId }) {
  const filteredCards = cards.filter((card) => card.deckId === deckId);
  return filteredCards.length;
}

function DecksList({ decks: { decks, cards } }) {
  return (
    <>
      {decks.map((deck) => (
        <div className="card deck" key={deck.id}>
          <div className="card-body">
            <h5 className="card-title">{deck.name}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {countCards({ cards, deckId: deck.id })} cards
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
}

export default DecksList;
