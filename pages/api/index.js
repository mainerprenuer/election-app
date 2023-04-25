/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(req, res) {
  res.status(200).json({ msg: "Welcome to APCAIMS api" });
}
