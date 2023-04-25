import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const agentsCollection = db.collection("agents");
  let { state } = req.query;

  if ((req.method = "GET")) {
    try {
      const data = await agentsCollection
        .find(
          { state: state },
          {
            projection: {
              agentType: 1,
              electionType: 1,
              _id: 0,
              lga: 1,
            },
          }
        )
        // .limit(limit)
        .toArray();

      res.status(200).json({ data: data });
    } catch (e) {
      console.log(e);
      console.log("Oops an error occured");
    }
  }
}
