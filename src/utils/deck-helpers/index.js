import { deleteDeck } from "../api/index.js";

/**
 * Remove a deck from the decks state.
 * @param {string} deckId  - The ID of the deck to delete.
 * @param {*} setDecks - Updates the decks state
 */

const handleDeleteDeck = (deckId, setDecks) => {
  const abortController = new AbortController();
  const isConfirmed = window.confirm(
    `Delete this deck?\n\nYou will not be able to recover it.`
  );

  if (isConfirmed) {
    deleteDeck(deckId, abortController.signal)
      .then(() => {
        setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
      })
      .catch((error) => {
        error.name === "AbortError"
          ? console.log("Request aborted.")
          : console.error("Error deleting deck:", error);
      });
  }
};
