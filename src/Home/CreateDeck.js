import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index.js";
import Breadcrumb from "../Breadcrumb/Breadcrumb.js";

function CreateDeck({ decks, setDecks }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if required fields are filled
    if (!formData.name || !formData.description) {
      alert("Please fill out all required fields.");
      return;
    }

    // Create a new deck object
    const newDeck = {
      id: decks.length + 1, // Find the currenct size of the decks state and increase the value by 1
      ...formData,
      cards: [],
    };

    try {
      // Call the createDeck function to save the deck to the API
      const createdDeck = createDeck(newDeck);

      // Update the decks state with the created deck
      setDecks([...decks, createdDeck]);

      // setTimeout using a timeout of 0 milliseconds to execute after the re-render
      setTimeout(() => {
        history.push(`/decks/${newDeck.id}`); // Redirect to the DeckView for the newly created deck
      }, 0);
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  const handleCancel = () => {
    // If the user clicks Cancel, go back to the Home screen
    history.push("/");
  };

  const breadcrumbPaths = [
    { link: "/", text: "Home" },
    {
      text: "Create Deck",
    },
  ];

  return (
    <>
      <Breadcrumb paths={breadcrumbPaths} />
      <h1>Create Deck</h1>
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

export default CreateDeck;
