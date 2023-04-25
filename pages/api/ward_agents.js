import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const agentsCollection = db.collection("agents");
  let { state, lga, ward } = req.query;

  if ((req.method = "GET")) {
    try {
      const data = await agentsCollection
        .find(
          { state, lga, ward },
          {
            projection: {
              agentType: 1,
              electionType: 1,
              firstName: 1,
              lastName: 1,
              lastName: 1,
              _id: 1,
              lga: 1,
            },
          }
        )
        .toArray();

      res.status(200).json({ data: data });
    } catch (e) {
      console.log(e);
      console.log("Oops an error occured");
    }
  }
}
