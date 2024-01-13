import { deleteDeck } from "../api/index.js";

/**
 * Finds a deck from the given array of decks based on its ID.
 * @param {Array} decks - An array of deck objects.
 * @param {string} deckId - The ID of the deck to find.
 * @returns {Object|null} - The deck object if found, or null if not found.
 */
export const findDeck = (decks, deckId) => {
  return decks.find((deck) => deck.id.toString() === deckId);
};

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
