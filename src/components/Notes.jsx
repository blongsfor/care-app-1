// components/Notes.jsx

import React, { useEffect, useState } from "react";

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
    <div>
      <h2>Your To-Do</h2>
      <form onSubmit={addNote}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter your to-do"
          required
        />
        <button type="submit">Add Item</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {notes.length > 0 ? (
            notes.map((note) => (
              <li
                key={note._id}
                style={{
                  textDecoration: note.completed ? "line-through" : "none", //cross note if it is completed
                }}
              >
                <input
                  type="checkbox"
                  checked={note.completed}
                  onChange={() => toggleCompletion(note._id, !note.completed)}
                />
                {note.task}
              </li>
            ))
          ) : (
            <p>No To-Do's available</p>
          )}
        </ul>
      )}
      <button onClick={deleteCompletedNotes}>Delete Completed Items</button>
    </div>
  );
}
