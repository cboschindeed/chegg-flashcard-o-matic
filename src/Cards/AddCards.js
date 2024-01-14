import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index.js";
import { findDeck } from "../utils/deck-helpers/index.js";
import Breadcrumb from "../Breadcrumb/Breadcrumb.js";
import CardForm from "./CardForm.js";

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

  const breadcrumbPaths = [
    { link: "/", text: "Home" },
    {
      link: `/decks/${deckId}`,
      text: currentDeck ? currentDeck.name : "Error loading deck name.",
    },
    {
      text: "Add Card",
    },
  ];

  return (
    <>
      <Breadcrumb paths={breadcrumbPaths} />
      <h1>{`${deckName}: Add Card`}</h1>
      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleDone}
        buttonDismissText="Done"
        buttonConfirmText="Save"
      />
    </>
  );
}

export default AddCard;
