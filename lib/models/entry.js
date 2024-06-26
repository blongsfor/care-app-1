import mongoose from "mongoose";

const { Schema } = mongoose;

const documentationSchema = new Schema({
  datetimestart: { type: Date, required: true },
  datetimeend: { type: Date, required: true },
  task: { type: String, required: true },
  details: { type: String, required: true },
});

const entrySchema = new Schema({
  client: { type: String, required: true },
  clientID: { type: String, required: true },
  documentation: { type: [documentationSchema], required: true },
});

const Entry = mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default Entry;
