import React from "react";
import { useRouter } from "next/router";
import { data } from "../../constants/states/index";
import axios from "axios";
import Link from "next/link";

export default function Wards({ agentsList }) {
  const router = useRouter();
  let { info } = router.query;
  console.log(agentsList);
  const getStatesInfo = () =>
    data.states.filter((state) => state.state == info);

  function getWardsCount(lga, ward) {
    const fl = agentsList.data.filter((ag) => ag.lga == lga && ag.ward == ward);
    return fl.length;
  }

  return (
    <div className="section">
      <h1>{info} State</h1>
      <h3>All LGAs and Wards</h3>
      <div className="wards">
        {getStatesInfo().map((state, index) => (
          <div className="info" key={index}>
            {state.lga.map((lga, lgaIndex) => (
              <div className="info" key={lgaIndex}>
                <div className="tile">
                  <h4>{`${lgaIndex + 1}. ${lga.name}`}</h4>
                  <p>agents</p>
                </div>
                <div className="moreInfo">
                  {lga.wards.map((ward, wardInex) => (
                    <Link
                      key={wardInex}
                      href={`/wards/agents/${state.state}~${lga.name}~${ward}`}
                    >
                      <a>
                        <div className="moreInfoList">
                          <p>{ward}</p>
                          <p>{getWardsCount(lga.name, ward)}</p>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  console.log(query);

  let art;
  art = await axios(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/lga_wards?state=${query.info}`
  );

  // console.log(art);
  return {
    props: {
      agentsList: art.data,
    },
  };
}
