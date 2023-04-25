import { async } from "@firebase/util";
import axios from "axios";
import React from "react";
import S3 from "aws-sdk/clients/s3";

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

export default function TestPage() {
  async function uploadImage(e) {
    const formData = new FormData(e.target);
    const file = formData.get("file");
    console.log("Upload function");
    if (!file) {
      console.log("Upload function - Nofile");
      return null;
    }
    const fileType = encodeURIComponent(file.type);
    console.log("Upload function - fileType", fileType);
    console.log(file);
    // const { data } = await axios.get(`/api/upload_image?fileType=${fileType}`);
    // const { uploadUrl, key } = data;
    // const uploadedData = await axios.put(uploadUrl, file, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }); // using presigned url to upload image

    // const img = uploadUrl.split("?")[0].concat(".jpg");
    // console.log(uploadUrl);
    // console.log(img);
    // console.log(uploadedData.data);

    return "uploadedData";
    // return uploadedData;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    const uploadedData = await uploadImage(e);
    console.log("Reached handlesubmit - after await", uploadedData);
    // console.log(uploadedData);
  }

  const handleOnchange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    // console.log(value);
    // console.log(name);

    if (name == "image") {
    }
  };
  return (
    <div className="section">
      <br />
      <br />
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          id="form-image"
          name="file"
          // value={agent.image}
          // onChange={handleChange}
          accept="image/*"
        />
        <input
          type="submit"
          value="Submit"
          className="btn"
          name="image"
          onChange={handleOnchange}
        />
      </form>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
