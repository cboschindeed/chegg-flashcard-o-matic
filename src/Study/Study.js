import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readCard } from "../utils/api/index.js";

function Study({ decks }) {
  const { deckId } = useParams();
  console.log("Deck ID from useParams:", deckId);
  console.log("Decks prop:", decks);
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    console.log("Effect is running!");
    async function loadCards() {
      try {
        console.log("Deck ID:", deckId);
        console.log("All Decks:", decks);

        const deck = decks.find((deck) => deck.id.toString() === deckId);
        console.log("Found Deck:", deck);

        if (deck) {
          console.log("Deck:", deck);
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

  console.log("Current Card:", currentCard);

  return (
    <>
      <h1>Study page {deckId}</h1>
      <div className="card">
        <div className="card-body">
          <h3 className="cart-title">
            Card {currentCardIndex + 1} of {cards.length}
          </h3>
          <p className="card-text">{currentCard.front}</p>
          <button className="btn btn-secondary">Flip</button>
        </div>
      </div>
    </>
  );
}

export default Study;
