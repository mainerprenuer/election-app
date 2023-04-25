import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Chart from "../../comps/chart";
import { bgColors } from "../../constants/chartColors";
import { data } from "../../constants/states/";

export default function SummaryPage({ agentsList }) {
  const router = useRouter();
  const query = router.query;
  const userState = query.state;

  const selectedLg = data.states.filter((val) =>
    val.state.toLowerCase().includes(userState.toLowerCase())
  );
  console.log("selectedLg");
  console.log(selectedLg);

  function getCount(lganame) {
    let ags = agentsList.data.filter((ag) => ag.lga == lganame);
    return ags.length;
  }
  const label = selectedLg[0].lga.map((lga) => lga.name);
  const agentCount = selectedLg[0].lga.map((lga) => getCount(lga.name));

  const [userData, setUserData] = useState({
    labels: label,
    datasets: [
      {
        label: "LGAs",
        data: agentCount,
        backgroundColor: bgColors,
      },
    ],
  });

  return (
    <Chart
      chartdata={userData}
      title="Agents in the various LGAs"
      chartType="DOUGHNUT"
    />
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  try {
    let art;
    art = await axios(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/agents?state=${query.state}`
    );
    return {
      props: {
        agentsList: art.data,
      },
    };
  } catch (error) {
    console.log("Opps an error");
    return {
      props: {
        agentsList: [],
      },
    };
  }
  // console.log(art);
}
