import dbConnect from "../../../../lib/dbConnect";
import Note from "../../../../lib/models/notes";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const notes = await Note.find({});
      return res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notes" });
    }
  }

  if (req.method === "POST") {
    try {
      const { task, dueDate } = req.body;
      const newNote = new Note({ task, dueDate });
      const savedNote = await newNote.save();
      res.status(201).json(savedNote);
    } catch (error) {
      res.status(500).json({ error: "Failed to create note" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { id, completed } = req.body;
      const updatedNote = await Note.findByIdAndUpdate(
        id,
        { completed },
        { new: true }
      );
      res.status(200).json(updatedNote);
    } catch (error) {
      res.status(500).json({ error: "Failed to update note" });
    }
  }
  if (req.method === "DELETE") {
    try {
      const deletedNotes = await Note.deleteMany({ completed: true });
      res.status(200).json(deletedNotes);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete completed notes" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
