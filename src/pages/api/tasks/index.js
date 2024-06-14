import dbConnect from "../../../../lib/dbConnect";
import Task from "../../../../lib/models/task";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    //console.log("hier sollte Task???");
    try {
      const tasks = await Task.find();
      //   console.log("tasks", tasks);
      //console.log("hier sollte Task;", tasks);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
