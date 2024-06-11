import dbConnect from "../../../../lib/dbConnect";
import Entry from "../../../../lib/models/entry";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const entries = await Entry.find().lean();

      res.status(200).json(entries);
    } catch (error) {
      console.error("Error fetching entries:", error);
      res.status(500).json({ error: "Failed to fetch entries" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }

  if (req.method === "POST") {
    try {
      const newEntry = req.body;
      await Entry.create(newEntry);
      response.status(200).json({ status: "new entry created" });
    } catch (error) {
      console.error("Error creating entry:", error);
      res.status(404).json({ error: "Failed to create entry" });
    }
  }
}
