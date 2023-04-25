// import { connectToDatabase } from "../../utils/mongodb";

// export default async function handler(req, res) {
//   const { db } = await connectToDatabase();
//   const agents = db.collection("agents");
//   let { state, lga, ward } = req.query;

//   if ((req.method = "GET")) {
//     try {
//       const data = await agents
//         .aggregate([
//           { $match: {} },
//           {
//             $group: {
//               _id: "$state",
//               agentCount: {
//                 $count: {},
//               },
//             },
//           },
//         ])
//         .toArray();
//       res.status(200).json({ length: data.length, data: data });
//     } catch (e) {
//       console.log(e);
//       console.log("Oops an error occured");
//     }
//   }
// }
