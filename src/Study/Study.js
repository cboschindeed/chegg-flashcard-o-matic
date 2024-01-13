import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import NotEnoughCards from "./NotEnoughCards";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    };

    loadDeck();
  }, [deckId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (cardIndex < deck.cards.length - 1) {
      setCardIndex(cardIndex + 1);
      setIsFlipped(false);
    } else {
      const restartConfirmed = window.confirm(
        "Do you want to restart the deck?"
      );
      if (restartConfirmed) {
        setCardIndex(0);
        setIsFlipped(false);
      } else {
        history.push("/");
      }
    }
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  if (deck.cards.length <= 2) {
    return (
      <div>
        <NotEnoughCards deckId={deckId} />
      </div>
    );
  }

  const currentCard = deck.cards[cardIndex];

  return (
    <div>
      <h2>Study: {deck.name}</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{isFlipped ? "Answer" : "Question"}</h5>
          <p className="card-text">
            {isFlipped ? currentCard.back : currentCard.front}
          </p>
        </div>
      </div>
      <button onClick={handleFlip} className="btn btn-secondary mr-2">
        Flip
      </button>
      <button onClick={handleNext} className="btn btn-primary">
        Next
      </button>
    </div>
  );
}

export default Study;
