import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index.js";
import Breadcrumb from "../Breadcrumb/Breadcrumb.js";
import CardForm from "./CardForm.js";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [card, setCard] = useState({});
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });
  const [currentDeck, setCurrentDeck] = useState({});

  useEffect(() => {
    const loadCardAndDeck = async () => {
      try {
        const loadedCard = await readCard(cardId);

        setCard(loadedCard);

        setFormData({
          front: loadedCard.front,
          back: loadedCard.back,
        });
        setCurrentDeck(await readDeck(deckId));
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
