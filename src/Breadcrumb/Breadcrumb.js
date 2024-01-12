import React from "react";
import { Link } from "react-router-dom";
import { findDeck } from "../utils/deck-helpers";

function Breadcrumb({ deckId, decks, createDeckLink = false }) {
  const currentDeck = deckId ? findDeck(decks, deckId) : null;
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
          {createDeckLink ? (
            <li className="breadcrumb-item">
              <Link to={`/decks/new`}>Create Deck</Link>
            </li>
          ) : (
            deckId && (
              <li className="breadcrumb-item active" aria-current="page">
                Study
              </li>
            )
          )}
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;
