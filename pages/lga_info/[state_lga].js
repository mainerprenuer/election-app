import React, { useState, useEffect } from "react";
import LGAs from "../../comps/lga";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

export default function LGAPage({ agentsList }) {
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

  return (
    <div className="lgaWrapper">
      <div className="comp">
        <Head>
          <title>APCAIMS | LGA</title>
        </Head>
        {/* <LGAs userState={user.name} agentsList={agentsList.data} /> */}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  console.log(query);
  const val = query.state_lga;
  const [state, lga] = val.split("_");
  // try {
  let art;
  art = await axios(
    // `${process.env.NEXT_PUBLIC_DOMAIN}/api/agents?state=${state}&lga=${lga}`
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/lga_info?state=${"DELTA"}&lga=${lga}`
  );
  // console.log(art);

  return {
    props: {
      agentsList: art.data,
    },
  };
}
