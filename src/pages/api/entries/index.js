import dbConnect from "../../../../lib/dbConnect";
import Entry from "../../../../lib/models/entry";

export default async function handler(req, res) {
  await dbConnect();

  console.log("request method:", req.method);

  try {
    switch (req.method) {
      case "GET":
        const entries = await Entry.find().lean();
        return res.status(200).json(entries);

      case "POST":
        const { client, documentation, clientID } = req.body;
        let entry = await Entry.findOneAndUpdate(
          { clientID },
          { $push: { documentation } },
          { upsert: true, new: true }
        );
        return res.status(200).json({ status: "Entry saved successfully" });

      case "PUT":
        const { id, ...updateData } = req.body;
        await Entry.findByIdAndUpdate(id, { $set: updateData });
        return res.status(200).json({ status: `Entry ${id} updated!` });

      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
