import dbConnect from "../../../../lib/dbConnect";
import Client from "../../../../lib/models/client";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const clients = await Client.find();
      console.log("clients", clients);
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch clients" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
