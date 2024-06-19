// components/Notes.jsx

import React, { useEffect, useState } from "react";

const styles = {
  container: {
    width: "90%",
    // maxWidth: "500px",
    backgroundColor: "rgba(85, 111, 154, 0.6)",
    backdropFilter: "blur(14px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "all 0.5s ease-in-out",
    marginTop: "20px",
  },
  heading: {
    fontSize: "2em",
    color: "white",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
    width: "290px",
  },
  input: {
    padding: "10px",
    fontSize: "1em",
    borderRadius: "4px",
    border: "1px solid #bdc3c7",
    marginBottom: "10px",
    width: "100%",
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
  ul: {
    listStyle: "none",
    padding: 0,
  },
  li: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "rgba(85, 111, 154, 0.6)",
    marginBottom: "10px",
    transition: "transform 0.2s",
    color: "white",
  },
  checkbox: {
    marginRight: "10px",
  },
  deleteButton: {
    padding: "10px",
    fontSize: "1em",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "darkorange",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.2s",
    marginTop: "20px",
  },

  task: {
    flex: "1",
    marginLeft: "5px",
  },
};

export default function Notes() {
  const [notes, setNotes] = useState([]); //array of objects, deshalb empty
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true); //need to double-check this but it's working

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notes");
        const data = await res.json();
        setNotes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const addNote = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: newNote }),
      });
      const data = await res.json();
      setNotes([data, ...notes]);
      setNewNote("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const toggleCompletion = async (id, completed) => {
    try {
      const res = await fetch("/api/notes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, completed }),
      });
      const updatedNote = await res.json();
      setNotes(notes.map((note) => (note._id === id ? updatedNote : note)));
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };
  const deleteCompletedNotes = async () => {
    try {
      const res = await fetch("/api/notes", {
        //need to revise this but works
        method: "DELETE",
      });
      setNotes(notes.filter((note) => !note.completed));
    } catch (error) {
      console.error("Error deleting completed notes:", error);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={addNote} style={styles.form}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="add your new task here..."
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add Task
        </button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={styles.ul}>
          {notes.length > 0 ? (
            notes.map((note) => (
              <li
                key={note._id}
                style={{
                  ...styles.li,
                  textDecoration: note.completed ? "line-through" : "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={note.completed}
                  onChange={() => toggleCompletion(note._id, !note.completed)}
                  style={styles.checkbox}
                />
                <div style={styles.task}>{note.task}</div>
              </li>
            ))
          ) : (
            <p>No To-Do's available</p>
          )}
        </ul>
      )}
      <button onClick={deleteCompletedNotes} style={styles.deleteButton}>
        Delete Completed Tasks
      </button>
    </div>
  );
}
