import React, { useState, useEffect } from "react";
import LGAs from "../../comps/lga";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

export default function LGAPage({ agentsList }) {
  const router = useRouter();
  const query = router.query;
  const userState = query.state;

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

  return (
    <div className="section">
      <Head>
        <title>APCAIMS | LGA</title>
      </Head>
      <LGAs userState={userState} agentsList={agentsList.data} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  console.log(query);
  let art;
  art = await axios(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/lga_info?state=${query.state}`
  );

  return {
    props: {
      agentsList: art.data,
    },
  };
}
