import axios from "axios";
import React, { useState, useEffect } from "react";
import Chart from "../../comps/chart";
import { bgColors } from "../../constants/chartColors";
import { data } from "../../constants/states/";
import { utils } from "../../utils";
import { Circles } from "react-loader-spinner";

export default function AllStatesPage({}) {
  const [showGraph, setShowGraph] = useState(false);
  const [generateBtn, setGenerateBtn] = useState(true);
  const [userData, setUserData] = useState({});

  const label = data.states.map((val) => val.state);
  const __agentsList = [];

  async function fetchStates() {
    setGenerateBtn(false);
    try {
      await data.states.map(async (val, index) => {
        let art = await axios(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/agents_by_state?state=${val.state}`
        );
        art = art.data;
        console.log(index, art.length);
        __agentsList.push(art.length);
        if (__agentsList.length == 37) {
          console.log("completed fetching");

          console.log(__agentsList);
        }
      });

      // setShowGraph(true);
    } catch (e) {
      console.log(e);
    }
  }

  const setupchart = () => {
    // setShowGraph(false);
    console.log(__agentsList);
    // if (__agentsList.length < 1) {
    setUserData({
      labels: label,
      datasets: [
        {
          label: `${utils.numberWithCommas(
            __agentsList.reduce((partialSum, a) => partialSum + a, 0)
          )} Agents`,
          data: __agentsList,
          // data: agentCount(gentsList),
          minBarLength: 1,
          backgroundColor: bgColors,
          xAxisID: "States",
          yAxisID: "Agent count",
          scaleShowValues: true,
          scales: {
            x: {
              ticks: {
                autoSkip: false,
                maxRotation: 90,
                minRotation: 90,
              },
            },
          },
        },
      ],
    });
    // }
    // setShowGraph(true);
  };

  return (
    <div>
      <div className="section">
        {generateBtn && (
          <a className="btn" onClick={() => fetchStates()}>
            Generate Data
          </a>
        )}

        {!generateBtn && (
          <a className="btn" onClick={() => setupchart()}>
            Show Graph
          </a>
        )}
      </div>

      {showGraph && (
        <Chart
          chartdata={userData}
          title="Agents in all states"
          chartType="DOUGHNUT"
        />
      )}
    </div>
  );
}
