import S3 from "aws-sdk/clients/s3";
import { randomUUID } from "crypto";
/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

// importn;

const region = "us-east-1";
const bucketname = "apcaims";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secertAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const signatureVersion = "v4";
const apiVersion = "2006-03-01";

const s3 = new S3({
  apiVersion,
  accessKeyId,
  secertAccessKey,
  region,
  signatureVersion,
});

export default async function handler(req, res) {
  const ex = req.query.fileType.toString().split("/")[1];
  const KEY = `${randomUUID()}`;
  // console.log("API reached");

  console.log(KEY);

  const s3Params = {
    Bucket: bucketname,
    Key: KEY,
    Expires: 120,
    ContentType: `image/${ex}`,
  };
  const uploadUrl = await s3.getSignedUrl("putObject", s3Params);
  // console.log(uploadUrl);

  // GetObjectCommand(bucketParams);
  // Convert the ReadableStream to a string.
  // return await data.Body.transformToString();
  res.status(200).json({ uploadUrl, KEY });
}
