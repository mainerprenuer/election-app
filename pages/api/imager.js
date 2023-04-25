import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const agentsCollection = db.collection("agents");

  if ((req.method = "GET")) {
    try {
      const data = await agentsCollection
        .find(
          {
            state: "KOGI",
            electionType: "PRESIDENTIAL",
            agentType: "POLLING UNIT",
          },
          {
            projection: {
              image: 1,
              _id: 1,
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
