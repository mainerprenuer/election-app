import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { state } = req.query.state;

  console.log("vv");
  console.log(vv);
  const data = await db.collection("agents");
  const { Collection } = data;
  console.log(data);
  // .find({ state: state })
  // .limit(100)
  // .toArray();
  res.status(200).json({ msg: "Welcome to APCAIMS api" });
}
