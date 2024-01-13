import React, { useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index.js";
import { findDeck } from "../utils/deck-helpers/index.js";

function AddCard({ decks }) {
  const { deckId } = useParams();
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Load the current deck
      const currentDeck = await readDeck(deckId);

      // Create a new card
      const newCard = {
        front: formData.front,
        back: formData.back,
        deckId: parseInt(deckId),
      };

      // Add the new card to the deck
      await createCard(deckId, newCard);

      // Clear the form data
      setFormData({
        front: "",
        back: "",
      });
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  const handleDone = () => {
    // Redirect to the Deck screen
    history.push(`/decks/${deckId}`);
  };

  const currentDeck = findDeck(decks, deckId);
  const deckName = currentDeck ? currentDeck.name : "Deck Name Unavailable";

  return (
    <>
      <h1>{`${deckName}: Add Card`}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            className="form-control"
            placeholder="Front side of card"
            id="front"
            name="front"
            value={formData.front}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            placeholder="Back side of card"
            id="back"
            name="back"
            value={formData.back}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={handleDone}
        >
          Done
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </>
  );
}

export default AddCard;
