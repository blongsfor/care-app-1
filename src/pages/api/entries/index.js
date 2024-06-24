import dbConnect from "../../../../lib/dbConnect";
import Entry from "../../../../lib/models/entry";

export default async function handler(req, res) {
  await dbConnect();

  console.log("request method:", req.method);

  try {
    switch (req.method) {
      case "GET":
        const entries = await Entry.find().lean();
        res.status(200).json(entries);
        break;

      case "POST":
        const { client, documentation, clientID } = req.body;
        let entry = await Entry.findOneAndUpdate(
          { clientID },
          { $push: { documentation } },
          { upsert: true, new: true }
        );
        res.status(200).json({ status: "Entry saved successfully" });
        break;

      case "PUT":
        const { id, ...updateData } = req.body;
        await Entry.findByIdAndUpdate(id, { $set: updateData });
        res.status(200).json({ status: `Entry ${id} updated!` });
        break;

      default:
        res.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
}
