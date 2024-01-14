import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import NotEnoughCards from "./NotEnoughCards";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const history = useHistory();
  const breadcrumbPaths = [
    { link: "/", text: "Home" },
    {
      link: `/decks/${deckId}`,
      text: deck ? deck.name : "Error loading deck name.",
    },
    {
      text: "Study",
    },
  ];

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
    if (cardIndex < deck.cards.length - 1) {
      setIsFlipped(!isFlipped);
    } else {
      setIsFlipped(!isFlipped);
      // setTimeout using a timeout of 0 milliseconds to execute after the re-render
      setTimeout(() => {
        const restartConfirmed = window.confirm(
          `Restart cards?\n\nClick "Cancel" to return to the Home page.`
        );
        if (restartConfirmed) {
          setCardIndex(0);
          setIsFlipped(false);
        } else {
          history.push("/");
        }
      }, 0);
    }
  };

  const handleNext = () => {
    if (cardIndex < deck.cards.length - 1) {
      setCardIndex(cardIndex + 1);
      setIsFlipped(false);
    }
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  if (deck.cards.length <= 2) {
    return (
      <div>
        <Breadcrumb paths={breadcrumbPaths} />
        <h2>Study: {deck.name}</h2>
        <NotEnoughCards deckId={deckId} />
      </div>
    );
  }

  const currentCard = deck.cards[cardIndex];

  return (
    <div>
      <Breadcrumb paths={breadcrumbPaths} />
      <h2>Study: {deck.name}</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {`Card ${cardIndex + 1} of ${deck.cards.length}`}
          </h5>
          <p className="card-text">
            {isFlipped ? currentCard.back : currentCard.front}
          </p>
          <button onClick={handleFlip} className="btn btn-secondary mr-2">
            Flip
          </button>
          {isFlipped && cardIndex < deck.cards.length - 1 && (
            <button onClick={handleNext} className="btn btn-primary">
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Study;
