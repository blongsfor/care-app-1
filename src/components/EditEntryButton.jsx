import React, { useState } from "react";
import { useRouter } from "next/router";

const EditEntryButton = ({ clientID, docIndex, doc }) => {
  const [isEditing, setIsEditing] = useState(false); // to see if in editing mode or not, false because normally it's not
  const [formData, setFormData] = useState({
    datetimestart: doc.datetimestart,
    datetimeend: doc.datetimeend, // like the values of the form we are creating
    task: doc.task,
    details: doc.details,
  });
  const router = useRouter(); // have it here to later reload the page again

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }; // handle the change from the edit fields -> the new input

  const handleEdit = async (event) => {
    event.preventDefault();

    const response = await fetch(`/api/entries/${clientID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ docIndex, updatedDoc: formData }),
    });

    if (response.ok) {
      setIsEditing(false);
      router.reload(); //to reload the page again and see the edited changes
    }
  };

  // // function formatDateTime(dateTimeString) {
  // //   const date = new Date(dateTimeString);
  // //   return date.toLocaleString("default", {
  // //     day: "2-digit",
  // //     month: "2-digit",
  // //     year: "numeric",
  // //     hour: "2-digit",
  // //     minute: "2-digit",
  // //     hour12: false, // Use 24-hour format
  // //   });
  // }

  return (
    //  if isEditing is true return a form with the inputs already done and make them editable
    <>
      {isEditing ? (
        <form onSubmit={handleEdit}>
          <input
            type="text"
            name="datetimestart"
            value={formData.datetimestart}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="datetimeend"
            value={formData.datetimeend}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="task"
            value={formData.task}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="details"
            value={formData.details}
            onChange={handleInputChange}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit Entry</button>
      )}
    </>
    // when submitting  its edited and to false again when cancel
  );
};

export default EditEntryButton;
