import React, { useEffect, useState } from "react";
import { useParams, Link, useRouteMatch, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

function Deck({ decks, setDecks }) {
  const { deckId } = useParams();
  const [currentDeck, setCurrentDeck] = useState(null);
  const { url } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const loadedDeck = await readDeck(deckId);
        console.log(loadedDeck);
        setCurrentDeck(loadedDeck);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    };

    loadDeck();
  }, [deckId]);

  const handleDeleteDeck = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this deck?"
    );
    if (confirmation) {
      // Call your deleteDeck function here and update the state
      deleteDeck(deckId);
      // Update the decks state (setDecks) by removing the deleted deck
      setDecks((prevDecks) =>
        // prevDecks.filter((deck) => deck.id !== parseInt(deckId))
        prevDecks.filter((deck) => deck.id !== deckId)
      );
      history.push("/");
    }
  };

  if (currentDeck === null) {
    // If currentDeck is still null, render a loading state or handle it appropriately
    return <p>Loading...</p>;
  }

  const breadcrumbPaths = [
    { link: "/", text: "Home" },
    {
      link: `/decks/${deckId}`,
      text: currentDeck ? currentDeck.name : "Error loading deck name.",
    },
  ];

  return (
    <div>
      <Breadcrumb paths={breadcrumbPaths} />
      <h1>{currentDeck.name}</h1>
      <p>{currentDeck.description}</p>

      <div>
        <Link to={`${url}/edit`} className="btn btn-secondary mr-2">
          <i className="bi bi-pencil-fill"></i> Edit
        </Link>
        <Link to={`${url}/study`} className="btn btn-primary mr-2">
          <i className="bi bi-book-half"></i> Study
        </Link>
        <Link to={`${url}/cards/new`} className="btn btn-primary mr-2">
          <i className="bi bi-plus-lg"></i> Add Cards
        </Link>
        <button onClick={handleDeleteDeck} className="btn btn-danger mr-2">
          <i className="bi bi-trash-fill"></i>
        </button>
      </div>

      <h2>Cards</h2>
      <div className="card-deck">
        {currentDeck.cards.map((card) => (
          <div key={card.id} className="card">
            <div className="card-body">
              <h5 className="card-title">Question: {card.front}</h5>
              <p className="card-text">Answer: {card.back}</p>
              <Link
                to={`${url}/cards/${card.id}/edit`}
                className="btn btn-secondary mr-2"
              >
                <i className="bi bi-pencil-fill"></i> Edit
              </Link>
              <button className="btn btn-danger">
                <i className="bi bi-trash-fill"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Deck;
