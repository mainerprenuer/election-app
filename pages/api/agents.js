import { controller } from "../../api/agents/index";
import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(req, res) {
  const { getAll } = controller;

  const { db } = await connectToDatabase();

  switch (req.method) {
    case "GET": {
      return getAll(db, req, res);
    }
    case "DELETE": {
      const { id: id } = req.query;
      const data = await db.collection("agents").remove({ _id: id });
      // const data = await db.collection("agents").remove({ _id: ObjectId(id) });
      return res.status(200).json({ msg: "deleted successfully", data });
    }
    case "PATCH": {
      const { id: id } = req.query;
      const { electionType, agenType } = req.body;
      console.log(req.body);
      const data = await db.collection("agents").updateOne(
        { _id: id },
        {
          $set: {
            electionType,
            agenType,
          },
        }
      );
      return res.status(200).json({ msg: "Updated Successfully", data });
    }
  }
}
