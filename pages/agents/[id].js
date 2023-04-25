import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

export default function AgentForm() {
  const router = useRouter();
  const { id } = router.query;
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    axios
      .get(`https://rxedu-api.vercel.app/api/v1/agent/${id}`)
      .then((response) => {
        setUserProfile(response.data.doc);
        console.log("Working");
        console.log(response.data.doc);
        // console.log(`Length: ${response}`);
      })
      .catch(() => {
        console.log("Opps an error ocured - Local");
      });
  }, {});
  const handlePrint = () => {
    window.print();
  };
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div className="agentFormWrapper">
      <Head>
        <title>
          Agents | {userProfile.firstName} {userProfile.firstName}
        </title>
      </Head>

      <div className="images">
        <img className="logo" src="/images/logo.png" />
      </div>
      <div className="headTitle">
        <h3 className="red">AGENT REGISTRATION FORM</h3>
        <h2>ALL PROGRESSIVES CONGRESS</h2>
      </div>
      <div className="imagesProfile">
        <img src={userProfile.image} />
      </div>
      <div className="headTitle">
        <h3 className="blue">PERSONAL INFORMATION</h3>
      </div>
      <div className="content">
        <h4>
          Name:
          <span>
            {userProfile.firstName} {userProfile.lastName}
          </span>
        </h4>
        <h4>
          ID: <span>{Date.parse(userProfile.registrationDate)}</span>
        </h4>
        {/* <h4>
          Address: <span>{userProfile.address}</span>
        </h4> */}
        <h4>
          Phone: <span>{userProfile.phone}</span>
        </h4>
        <h4>
          Email: <span>{userProfile.email}</span>
        </h4>
        <h4>
          State: <span>{userProfile.state}</span>
        </h4>
        <h4>
          LGA: <span>{userProfile.lga}</span>
        </h4>
        <h4>
          Ward: <span>{userProfile.ward}</span>
        </h4>
        <h4>
          Polling Unit: <span>{userProfile.pollingUnit}</span>
        </h4>
        <h4>
          Agent Type: <span>{userProfile.agentType}</span>
        </h4>
        <h4>
          Election Type: <span>{userProfile.electionType}</span>
        </h4>
        {/* <h4>
          Date of registration:
          <span>
            {dateFormat(userProfile.registrationDate, "dddd, mmmm dS, yyyy")}
          </span>
        </h4> */}
      </div>
      <div className="btn" onClick={() => handlePrint()}>
        Print Agent Card
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const art = await axios.get(
    `https://rxedu-api.vercel.app/api/v1/agent/${query.id}`
  );
  return {
    props: {
      // memberProfile: art.data.data,
      memberProfile: art.data.doc,
    },
  };
}
