import React, { useState, useEffect } from "react";
// import LGAs from "../../comps/lga";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

export default function LGAPage({ info, agentsList }) {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    statecode: "",
    img: "",
    userType: "",
  });

  useEffect(() => {
    if (!fetchUser()) {
      router.push("/");
    } else {
      setUser(fetchUser());
    }
  }, []);

  function fetchUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  // console.log(router.query);

  return (
    <div className="section">
      <Head>
        <title>APCAIMS | {info.lga} | INFO</title>
      </Head>

      <h4>State | LGA | Election Type | Agent Type</h4>
      <h2>
        {info.state} | {info.lga} | {info.electionType} | {info.agentType}
      </h2>

      <div className="tableSection">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Agent Type</th>
            </tr>
          </thead>
          <tbody>
            {agentsList.data.map((agent, index) => {
              const namer = `${agent.lastName} ${agent.firstName}`;
              return (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>{namer.toUpperCase()}</td>
                  <td>{agent.agentType}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  //   console.log(query);
  let ll = query.info.split("_");
  const info = {
    state: ll[0],
    lga: ll[1],
    electionType: ll[2],
    agentType: ll[3],
  };
  // try {
  let art;
  art = await axios(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/election_agent_info?state=${info.state}&lga=${info.lga}&electionType=${info.electionType}&agentType=${info.agentType}`
  );

  return {
    props: {
      agentsList: art.data,
      info,
    },
  };
}
