import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index.js";
import { findDeck } from "../utils/deck-helpers/index.js";
import Breadcrumb from "../Breadcrumb/Breadcrumb.js";

function EditDeck({ decks, setDecks }) {
  const { deckId } = useParams();
  const history = useHistory();
  const currentDeck = findDeck(decks, deckId);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const loadedDeck = await readDeck(deckId);
        setFormData({
          name: loadedDeck.name,
          description: loadedDeck.description,
        });
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    };

    loadDeck();
  }, [deckId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if required fields are filled
    if (!formData.name || !formData.description) {
      alert("Please fill out all required fields.");
      return;
    }

    // Create a new deck object with updated information
    const updatedDeck = {
      ...formData,
      id: deckId,
      cards: [], // Assuming cards are not updated in this form
    };

    try {
      // Call the updateDeck function to save the updated deck to the API
      await updateDeck(updatedDeck);

      // Update the decks state with the updated deck
      setDecks((prevDecks) =>
        prevDecks.map((deck) =>
          deck.id === deckId ? { ...deck, ...updatedDeck } : deck
        )
      );

      // Redirect to the Deck screen for the updated deck
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating deck:", error);
    }
  };

  const handleCancel = () => {
    // If the user clicks Cancel, go back to the Deck screen
    history.push(`/decks/${deckId}`);
  };

  const breadcrumbPaths = [
    { link: "/", text: "Home" },
    {
      link: `/decks/${deckId}`,
      text: currentDeck ? currentDeck.name : "Error loading deck name.",
    },
    {
      text: "Edit Deck",
    },
  ];

  return (
    <>
      <Breadcrumb paths={breadcrumbPaths} />
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            placeholder="Deck name"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            placeholder="Brief description of the deck"
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
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

export default EditDeck;
