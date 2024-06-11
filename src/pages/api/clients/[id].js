import dbConnect from "../../../../lib/dbConnect";
import Client from "../../../../lib/models/client";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const client = await Client.findById(id);

    if (!client) {
      return response.status(404).json({ status: "No Clients Found" });
    }

    response.status(200).json(client);
  }
}
