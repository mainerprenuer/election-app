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
              state: 1,
            },
          }
        )
        // .limit(limit)
        .toArray();

      res.status(200).json({ length: data.length });
    } catch (e) {
      console.log(e);
      console.log("Oops an error occured");
    }
  }
}
