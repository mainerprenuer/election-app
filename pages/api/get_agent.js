import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { id: id } = req.query;
  if (req.method == "GET") {
    const data = await db.collection("agents").find({ _id: id });
    return res.status(200).json({ data: data });
  }
}
