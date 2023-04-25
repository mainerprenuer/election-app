import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  let { state, limit, page } = req.query;
  // if (!limit) limit = 20;
  // if (!page) page = 1;
  limit = parseInt(limit) || 4000;
  page = parseInt(page) || 1;

  if ((req.method = "GET")) {
    try {
      const fullData = await db
        .collection("agents")
        .find(
          { state: state },
          {
            projection: {
              _id: 1,
            },
          }
        )
        .toArray();

      const data = await db
        .collection("agents")
        .find(
          { state: state },
          {
            projection: {
              firstName: 1,
              lastName: 1,
              agentType: 1,
              electionType: 1,
              _id: 1,
            },
          }
        )
        .limit(limit)
        .toArray();
      // res.status(200).json({ data: data });
      res.status(200).json({ length: fullData.length, data: data });
    } catch (e) {
      console.log(e);
      console.log("Oops an error occured");
    }
  }
}
