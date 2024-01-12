import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readCard } from "../utils/api/index.js";
import NotEnoughCards from "./NotEnoughCards.js";
import Breadcrumb from "../Breadcrumb/Breadcrumb.js";
import { findDeck } from "../utils/deck-helpers/index.js";

function Study({ decks }) {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const history = useHistory();

  // Flip button handler for toggling the front and back side of a card
  const handleFlip = () => {
    setIsFront(!isFront);
  };

  // Next button handler for moving to the next card in the deck
  const handleNext = () => {
    setCurrentCardIndex(currentCardIndex + 1); // Set index for the next card in the deck
    setCurrentCard(cards[currentCardIndex + 1]); // Set the current card to the next card in the deck
    setIsFront(true); // Reset to front side when moving to the next card
  };

  // Helper function to reset the
  const restartDeck = () => {
    setCurrentCardIndex(0); // Set index to the first card in the deck
    setCurrentCard(cards[0]); // Set the current card to the first card in the deck
    setIsFront(true); // Reset to front side when restarting the deck
  };

  const navigateHome = () => {
    history.push("/"); // Return to the Home page
  };

  useEffect(() => {
    async function loadCards() {
      try {
        const deck = findDeck(decks, deckId);

        if (deck) {
          const cardPromises = deck.cards.map((card) => readCard(card.id));
          const loadedCards = await Promise.all(cardPromises);
          setCards(loadedCards);
          setCurrentCard(loadedCards[0]);
        }
      } catch (error) {
        console.error("Error loading cards:", error);
      }
    }

    loadCards();
  }, [deckId, decks]);

  const currentDeck = findDeck(decks, deckId);
  const deckName = currentDeck ? currentDeck.name : "Deck Name Unavailable";
  console.log(cards);

  return (
    <>
      <Breadcrumb deckId={deckId} decks={decks} />
      <h1>Study: {deckName}</h1>
      {cards.length <= 2 ? (
        <NotEnoughCards deckId={deckId} />
      ) : (
        <div className="card">
          <div className="card-body">
            <h3 className="cart-title">
              Card {currentCardIndex + 1} of {cards.length}
            </h3>
            <p className="card-text">
              {currentCard && isFront ? currentCard.front : currentCard?.back}
            </p>
            <button className="btn btn-secondary" onClick={handleFlip}>
              Flip
            </button>
            {!isFront && currentCardIndex < cards.length - 1 ? (
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            ) : (
              !isFront &&
              currentCardIndex === cards.length - 1 && (
                <>
                  {window.confirm(
                    `Restart cards?\n\nClick 'Cancel' to return to the Home page.`
                  )
                    ? restartDeck()
                    : navigateHome()}
                </>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Study;
