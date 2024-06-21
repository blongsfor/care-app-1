import dbConnect from "../../../../lib/dbConnect";
import Note from "../../../../lib/models/notes";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const notes = await Note.find({});
      return res.status(200).json(notes);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch notes" });
    }
  }

  if (req.method === "POST") {
    try {
      const { task, dueDate } = req.body;
      const newNote = new Note({ task, dueDate });
      const savedNote = await newNote.save();
      return res.status(201).json(savedNote);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create note" });
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
      return res.status(200).json(updatedNote);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update note" });
    }
  }
  if (req.method === "DELETE") {
    try {
      const deletedNotes = await Note.deleteMany({ completed: true });
      return res.status(200).json(deletedNotes);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to delete completed notes" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
