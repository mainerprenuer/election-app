import { controller } from "../../api/agents/index";
import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(req, res) {
  const { getAll } = controller;

  const { db } = await connectToDatabase();

  switch (req.method) {
    case "GET": {
      const { id: id } = req.query;
      const data = await db.collection("agents").find(
        { _id: id },
        {
          projection: {
            firstName: 1,
            lastName: 1,
            lga: 1,
            electionType: 1,
            _id: 0,
          },
        }
      );
      // const data = await db.collection("agents").remove({ _id: ObjectId(id) });
      return res.status(200).json({ msg: "get successfully", data });
    }
  }
}
