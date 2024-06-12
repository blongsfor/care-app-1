// import dbConnect from "../../../../lib/dbConnect";
// import Entry from "../../../../lib/models/entry";

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method === "GET") {
//     try {
//       const entries = await Entry.find().lean();

//       res.status(200).json(entries);
//     } catch (error) {
//       console.error("Error fetching entries:", error);
//       res.status(500).json({ error: "Failed to fetch entries" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }

//   if (req.method === "POST") {
//     try {
//       const newEntry = req.body;
//       await Entry.create(newEntry);
//       response.status(200).json({ status: "new entry created" });
//     } catch (error) {
//       console.error("Error creating entry:", error);
//       res.status(404).json({ error: "Failed to create entry" });
//     }
//   }
// }

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
      const { clientID, client, documentation } = req.body;

      // Validate incoming data
      if (
        !clientID ||
        !client ||
        !documentation ||
        !documentation.datetime ||
        !documentation.task ||
        !documentation.details
      ) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // Check if an entry for the client already exists
      let entry = await Entry.findOne({ clientID });

      if (entry) {
        // Update existing entry
        entry.documentation.push(documentation);
        await entry.save();
      } else {
        // Create new entry
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
