import React, { useState } from "react";
import { format, parse } from "date-fns";

const EditEntryButton = ({ clientID, docIndex, doc, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false); // to see if in editing mode or not, false because normally it's not
  const [formData, setFormData] = useState({
    datetimestart: format(new Date(doc.datetimestart), "dd.MM.yyyy HH:mm"),
    datetimeend: format(new Date(doc.datetimeend), "dd.MM.yyyy HH:mm"),
    task: doc.task,
    details: doc.details,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // handle the change from the edit fields -> the new input / name is the key that value needs to get changed
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      datetimestart: parse(
        formData.datetimestart,
        "dd.MM.yyyy HH:mm",
        new Date()
      ).toISOString(),
      datetimeend: parse(
        formData.datetimeend,
        "dd.MM.yyyy HH:mm",
        new Date()
      ).toISOString(),
    };

    const response = await fetch(`/api/entries/${clientID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ docIndex, updatedDoc: updatedFormData }),
    });

    if (response.ok) {
      const updatedDoc = await response.json();
      setIsEditing(false);
      onUpdate();
    }
  };

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
