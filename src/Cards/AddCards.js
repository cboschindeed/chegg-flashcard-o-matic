import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index.js";
import Breadcrumb from "../Breadcrumb/Breadcrumb.js";
import CardForm from "./CardForm.js";

function AddCard() {
  const { deckId } = useParams();
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });
  const [currentDeck, setCurrentDeck] = useState({});
  const history = useHistory();

  useEffect(() => {
    const getCurrentDeck = async () => {
      try {
        setCurrentDeck(await readDeck(deckId));
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    };

    getCurrentDeck();
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

    try {
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
    <div>
      <Breadcrumb paths={breadcrumbPaths} />
      <h1>{`${currentDeck.name}: Add Card`}</h1>
      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleDone}
        buttonDismissText="Done"
        buttonConfirmText="Save"
      />
    </div>
  );
}

export default AddCard;
