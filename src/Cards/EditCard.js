import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readCard, updateCard } from "../utils/api/index.js";
import { findDeck } from "../utils/deck-helpers/index.js";
import Breadcrumb from "../Breadcrumb/Breadcrumb.js";
import CardForm from "./CardForm.js";

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
      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        buttonDismissText="Cancel"
        buttonConfirmText="Submit"
      />
    </>
  );
}

export default EditCard;
