import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readCard, updateCard } from "../utils/api/index.js";
import { findDeck } from "../utils/deck-helpers/index.js";
import Breadcrumb from "../Breadcrumb/Breadcrumb.js";

function EditCard({ decks }) {
  const { deckId, cardId } = useParams();
  const currentDeck = findDeck(decks, deckId);
  const history = useHistory();

  const [card, setCard] = useState({});
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

  useEffect(() => {
    const loadCardAndDeck = async () => {
      try {
        const loadedCard = await readCard(cardId);

        setCard(loadedCard);

        setFormData({
          front: loadedCard.front,
          back: loadedCard.back,
        });
      } catch (error) {
        console.error("Error loading card and deck:", error);
      }
    };

    loadCardAndDeck();
  }, [deckId, cardId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedCard = {
      ...card,
      front: formData.front,
      back: formData.back,
    };

    try {
      await updateCard(updatedCard);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  const breadcrumbPaths = [
    { link: "/", text: "Home" },
    {
      link: `/decks/${deckId}`,
      text: currentDeck ? currentDeck.name : "Error loading deck name.",
    },
    {
      text: "Edit Card",
    },
  ];

  return (
    <>
      <Breadcrumb paths={breadcrumbPaths} />
      <h1>Edit Card</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            className="form-control"
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
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default EditCard;
