import mongoose from "mongoose";

const { Schema } = mongoose;

const notesSchema = new Schema({
  task: { type: String, required: true },
  dueDate: { type: Date, required: false }, //currently not using dueDate but maybe in the future
  completed: { type: Boolean, default: false },
});

const Note = mongoose.models.Note || mongoose.model("Note", notesSchema);

export default Note;
