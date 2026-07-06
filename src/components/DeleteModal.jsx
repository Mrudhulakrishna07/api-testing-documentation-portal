function DeleteModal({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="delete-modal">

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="modal-buttons">

          <button
            className="cancel-api-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="delete-api-btn"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteModal;