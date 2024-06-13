// file created to work with all requests regarding the clientID

import dbConnect from "../../../../lib/dbConnect";
import Entry from "../../../../lib/models/entry";

export default async function handler(req, res) {
  await dbConnect();

  const { clientID } = req.query; // extracting the clientIDs

  if (req.method === "PUT") {
    // handling the put request
    try {
      const { docIndex, updatedDoc } = req.body; // index of the documentation entry and updated data

      const entry = await Entry.findOne({ clientID }); //searching again for the specific clientID
      if (!entry) {
        return res.status(404).json({ error: "Entry not found" });
      }

      entry.documentation[docIndex] = updatedDoc; // update the selected(specific) entry with the new data
      await entry.save();

      res.status(200).json({ status: `Entry ${clientID} updated!` });
    } catch (error) {
      console.error("Error updating entry:", error);
      res.status(500).json({ error: "Failed to update entry" });
    }
  } else if (req.method === "DELETE") {
    // Handling the DELETE request to delete a documentation entry
    try {
      const { docIndex } = req.query; // Extracting docIndex from query parameters

      const entry = await Entry.findOne({ clientID }); // Finding the client's entry
      if (!entry) {
        return res.status(404).json({ error: "Entry not found" });
      }

      // Remove the specific documentation entry at docIndex
      entry.documentation.splice(docIndex, 1);
      await entry.save();

      res.status(200).json({
        status: `Documentation entry ${docIndex} deleted for client ${clientID}`,
      });
    } catch (error) {
      console.error("Error deleting documentation entry:", error);
      res.status(500).json({ error: "Failed to delete documentation entry" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
