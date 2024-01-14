import React from "react";

function CardForm({
  formData,
  handleChange,
  handleSubmit,
  handleCancel,
  buttonDismissText,
  buttonConfirmText,
}) {
  return (
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
        onClick={handleCancel}
      >
        {buttonDismissText}
      </button>
      <button type="submit" className="btn btn-primary">
        {buttonConfirmText}
      </button>
    </form>
  );
}

export default CardForm;
