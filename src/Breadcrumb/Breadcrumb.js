import React from "react";
import { Link } from "react-router-dom";
import { findDeck } from "../utils/deck-helpers";

function Breadcrumb({ deckId, decks }) {
  const currentDeck = findDeck(decks, deckId);
  const deckName = currentDeck ? currentDeck.name : "Deck Name Unavailable";

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="bi bi-house-door-fill"></i> Home
            </Link>
          </li>
          {deckId && (
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deckName}</Link>
            </li>
          )}
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;
