import React from "react";
import { useRouter } from "next/router";

const DeleteEntryButton = ({ clientID, docIndex, onDelete }) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this entry?")) {
      return;
    }

    try {
      const response = await fetch(
        `/api/entries/${clientID}?docIndex=${docIndex}`, //docIndex was defined in Entrylist.jsx and then drilled
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        onDelete();
      } else {
        console.error("Failed to delete entry:", response);
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <button onClick={handleDelete} style={styles.deleteButton}>
      X
    </button>
  );
};

export default DeleteEntryButton;

const styles = {
  deleteButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "5px",
    fontSize: "0.8em",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "rgba(255, 116, 119, 0.9)",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};
