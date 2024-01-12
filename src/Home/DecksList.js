import React from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api/index.js";

function DecksList({ decks, setDecks }) {
  const handleDeleteClick = (deckId) => {
    const abortController = new AbortController();
    const isConfirmed = window.confirm(
      `Delete this deck?\n\nYou will not be able to recover it.`
    );

    if (isConfirmed) {
      deleteDeck(deckId, abortController.signal)
        .then(() => {
          setDecks((prevDecks) =>
            prevDecks.filter((deck) => deck.id !== deckId)
          );
        })
        .catch((error) => {
          error.name === "AbortError"
            ? console.log("Request aborted.")
            : console.error("Error deleting deck:", error);
        });
    }

    abortController.abort();
  }; // handleDeleteClick

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
              <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
                <i className="bi bi-eye-fill"></i> View
              </Link>
              <Link
                to={`/decks/${deck.id}/study`}
                className="btn btn-primary mr-2"
              >
                <i className="bi bi-book-half"></i> Study
              </Link>
              <button
                onClick={() => handleDeleteClick(deck.id)}
                className="btn btn-danger"
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </div>
          </div>
        ))}
      </>
    );
  } // if

  return <p>Loading...</p>;
}

export default DecksList;
