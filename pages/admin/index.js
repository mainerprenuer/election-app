import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { data } from "../../constants/states";
import axios from "axios";
import { utils } from "../../utils";
import { parse } from "uuid";
import DynamicChart from "../../comps/dynamic_chart";
import { bgColors } from "../../constants/chartColors";

export default function Dashboard({ statesCount }) {
  const router = useRouter();
  const query = router.query;
  const userState = query.state;

  function stateAgentCount(nameOfState) {
    let counterValue = statesCount.data.map((st) => {
      if (st._id.toUpperCase() == nameOfState.toUpperCase()) {
        return parseInt(st.agentCount);
      }
    });

    return counterValue;
  }

  const label = data.states.map((val, i) => val.state);

  function dataSets() {
    let vv = label.map((v) => {
      var cc = statesCount.data.filter(
        (st) => st._id.toUpperCase() == v.toUpperCase()
      );
      return cc.agentCount;
    });

    return vv;
  }

  const [userData, setUserData] = useState({
    labels: statesCount.data.map((val) => val._id),
    datasets: [
      {
        indexAxis: "y",
        axis: "y",
        label: "State",
        data: statesCount.data.map((val) => val.agentCount),
        backgroundColor: bgColors,
      },
    ],
  });

  return (
    <div className="adminWrapper">
      <Head>
        <title>{userState} | ADMIN</title>
      </Head>

      <div className="headingSection">
        <h1>All States</h1>
      </div>
      <div>
        <DynamicChart
          chartdata={userData}
          title="Agents in all states"
          chartType="BAR"
        />
      </div>

      <div className="dashboard">
        {data.states.map((val, i) => (
          <Link passHref href={`/dashboard/${val.state}`} key={i}>
            <div className="card">
              <div className="topbar teal"></div>
              <div className="content">
                <h3>{val.state}</h3>
                <p>{stateAgentCount(val.state)} agents</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const art = await axios.get(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/all_states`
  );

  return {
    props: {
      statesCount: art.data,
    },
  };
}
