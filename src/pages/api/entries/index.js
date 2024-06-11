import dbConnect from "../../../../lib/dbConnect";
import mongoose from "mongoose";

export default async (req, res) => {
  try {
    await dbConnect(); // Connect to the database

    const entriesCollection = mongoose.connection.db.collection("entries");

    if (req.method === "GET") {
      const { clientID } = req.query;
      const query = clientID ? { clientID } : {};
      const entries = await entriesCollection.find(query).toArray();
      res.status(200).json(entries);
    } else if (req.method === "POST") {
      const newEntry = req.body;
      const result = await entriesCollection.insertOne(newEntry);
      res.status(201).json(result);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
