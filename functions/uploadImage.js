import AWS from "aws-sdk/clients";
// importn;

const s3 = new AWS.S3();
const region = "us-east-1";
const bucketname = "apcaims";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secertKey = process.env.AWS_SECRET_ACCESS_KEY;
const signatureVersion = "4";

export async function generateUploadImageUrl() {}
const c = s3.putObject({});
var params = {
  Body: "Testing AWS S3 tier",
  Bucket: "apcaims" /* required */,
  Key: "STRING_VALUE" /* required */,
  ChecksumAlgorithm: CRC32 | CRC32C | SHA1 | SHA256,
  // ContentMD5: "STRING_VALUE",
  // ExpectedBucketOwner: "STRING_VALUE",
  // RequestPayer: requester,
  // VersionId: "STRING_VALUE",
};

s3.putObjectTagging(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data); // successful response
});
