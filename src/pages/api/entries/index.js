import dbConnect from "../../../../lib/dbConnect";
import Entry from "../../../../lib/models/entry";

export default async function handler(req, res) {
  await dbConnect();

  console.log("request method:", req.method);

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
      const { client, documentation, clientID } = req.body;

      let entry = await Entry.findOne({ clientID });

      if (entry) {
        // look for existing entry before creating
        entry.documentation.push(documentation);
        await entry.save();
      } else {
        // if not existing create a new one
        entry = new Entry({ clientID, client, documentation: [documentation] });
        await entry.save();
      }

      res.status(200).json({ status: "Entry saved successfully" });
    } catch (error) {
      console.error("Error creating/updating entry:", error);
      res.status(500).json({ error: "Failed to create/update entry" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
