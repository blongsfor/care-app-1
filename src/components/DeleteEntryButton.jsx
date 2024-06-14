import React from "react";
import { useRouter } from "next/router";

const DeleteEntryButton = ({ clientID, docIndex }) => {
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
        router.reload(); // Reloads the page after deleting the entry
      } else {
        console.error("Failed to delete entry:", response);
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return <button onClick={handleDelete}>X</button>;
};

export default DeleteEntryButton;
