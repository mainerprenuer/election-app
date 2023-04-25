import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import AgentsComp from "../../comps/agents";
import axios from "axios";

export default function AgentsPage({ agentsList, totalCount }) {
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
        <AgentsComp agentsList={agentsList.data} totalCount={totalCount} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const art = await axios.get("https://rxedu-api.vercel.app/api/v1/agent");
  console.log(art);
  return {
    props: {
      agentsList: art.data,
      totalCount: art.data.totalCount,
    },
  };
}
