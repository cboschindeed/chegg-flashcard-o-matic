/**
 * Finds a deck from the given array of decks based on its ID.
 * @param {Array} decks - An array of deck objects.
 * @param {string} deckId - The ID of the deck to find.
 * @returns {Object|null} - The deck object if found, or null if not found.
 */
export const findDeck = (decks, deckId) => {
  return decks.find((deck) => deck.id.toString() === deckId);
};
