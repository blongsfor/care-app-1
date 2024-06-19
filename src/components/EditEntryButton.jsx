import React, { useState } from "react";
import { format, parse } from "date-fns";

const EditEntryButton = ({ clientID, docIndex, doc, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    datetimestart: format(new Date(doc.datetimestart), "dd.MM.yyyy HH:mm"),
    datetimeend: format(new Date(doc.datetimeend), "dd.MM.yyyy HH:mm"),
    task: doc.task,
    details: doc.details,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    <>
      {isEditing ? (
        <form onSubmit={handleEdit} style={styles.form}>
          <input
            type="text"
            name="datetimestart"
            value={formData.datetimestart}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            name="datetimeend"
            value={formData.datetimeend}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            name="task"
            value={formData.task}
            onChange={handleInputChange}
            style={styles.input}
          />
          <textarea
            name="details"
            value={formData.details}
            onChange={handleInputChange}
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            style={styles.button}
          >
            Cancel
          </button>
        </form>
      ) : (
        <button style={styles.button} onClick={() => setIsEditing(true)}>
          Edit Entry
        </button>
      )}
    </>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: "10px",
  },
  input: {
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1em",
    width: "100%",
    boxSizing: "border-box",
  },
  textarea: {
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1em",
    width: "100%",
    minHeight: "100px",
    boxSizing: "border-box",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1em",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#556f9a",
    marginTop: "10px",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};

export default EditEntryButton;
