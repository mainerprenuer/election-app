import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import AgentsComp from "../../comps/agents";
import axios from "axios";

export default function AgentsPage({ agentsList }) {
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
      // console.log(fetchUser());
    } else {
      setUser(fetchUser());
    }
  }, []);

  function fetchUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  return (
    <div className="agentsWrapper">
      <Head>
        <title>APCAIMS | Agents</title>
      </Head>
      <div className="comp">
        {/* {<AgentsComp agentsList={filterAgentsBasedOnState()} />} */}
        <AgentsComp agentsList={agentsList.data} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const art = await axios(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/agents_list?state=${query.state}`
  );
  // console.log(art);
  return {
    props: {
      agentsList: art.data,
    },
  };
}
