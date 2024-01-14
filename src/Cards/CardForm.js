import React from "react";

function CardForm({
  formData,
  handleChange,
  handleSubmit,
  handleCancel,
  buttonText,
}) {
  return (
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
      <button type="submit" className="btn btn-primary">
        {buttonText}
      </button>
    </form>
  );
}

export default CardForm;
