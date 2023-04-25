import axios from "axios";
import React from "react";
import { saveAs } from "file-saver";

export default function Imager({ agentsList }) {
  const downloadImage = (url, filename) => {
    saveAs(url, filename);
  };
  return (
    <div className="imager">
      {agentsList.map((ag, i) => (
        <div className="imageCard" key={i}>
          <a download href={ag.image}>
            <img
              src={ag.image}
              alt={i}
              // onClick={() => downloadImage(ag.image, ag._d)}
            />
          </a>
          {/* <h5>{i}</h5> */}
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const art = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/imager`);
  // console.log(art.data.data);
  return {
    props: {
      agentsList: art.data.data,
    },
  };
}
