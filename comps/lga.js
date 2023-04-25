import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";
import { useState } from "react";
import { useRouter } from "next/router";
import { data } from "../constants/states/index";
import { utils } from "../utils";
import Link from "next/link";

export default function LGAs({ userState, agentsList }) {
  // const [agts, setAgents] = useState(agentsList);
  const [selectedElectionType, setElectionType] = useState("PRESIDENTIAL");
  const selectedLg = data.states.filter((val) =>
    val.state.toLowerCase().includes(userState.toLowerCase())
  );

  const router = useRouter();

  function filterLga(lganame) {
    let ags = agentsList.filter((ag) => ag.lga == lganame);
    return ags.length;
  }
  // function filterElectionType(lganame, electionType) {
  //   let ags = agentsList.filter(
  //     (ag) => ag.lga == lganame && ag.electionType == electionType
  //   );
  //   return ags.length;
  // }
  function calculateTotal(lganame) {
    let ags = agentsList.filter(
      (ag) => ag.lga == lganame && ag.electionType == selectedElectionType
    );
    return ags.length;
  }
  function filterAgentType(lganame, agentType) {
    let ags = agentsList.filter(
      (ag) =>
        ag.lga == lganame &&
        ag.agentType == agentType &&
        ag.electionType == selectedElectionType
    );
    return ags.length;
  }

  const handleChange = (e) => {
    console.log("Elections");
    if (e.target.name == "electionType") {
      console.log("Inside Election");
      setElectionType(e.target.value);
      console.log(selectedElectionType);
      console.log(e.target.value);
    }
  };
  const electionTypeList = [
    "PRESIDENTIAL",
    "SENATORIAL",
    "HOUSE OF REPS.",
    "GUBERNATORIAL",
    "STATE HOUSE OF ASSEMBLY",
  ];
  return (
    <div>
      <div className="lgatable">
        <div className="form dropdown">
          <div className=" input_box ">
            <form>
              <select
                className="select"
                name="electionType"
                value={selectedElectionType}
                id="form-election-type"
                required
                onChange={handleChange}
              >
                {electionTypeList.map((val, ii) => {
                  return (
                    <option value={val} key={ii}>
                      {val}
                    </option>
                  );
                })}
              </select>
            </form>
          </div>
        </div>
        {selectedLg[0].lga.map((lga, index) => (
          <div className="info" key={index}>
            <Link href={`wards/${userState}_${lga.name}`}>
              <div className="tile">
                <h4>{`${index + 1}. ${lga.name}`}</h4>
                <p>{utils.numberWithCommas(filterLga(lga.name))} agents</p>
              </div>
            </Link>
            <div className="moreInfo">
              <h4>Agent Type</h4>
              <Link
                passHref
                href={`/lga/agents/${userState}_${lga.name}_${selectedElectionType}_PRESIDENTIAL`}
              >
                <div className="moreInfoList">
                  <p>PRESIDENTIAL:</p>
                  <p>{filterAgentType(lga.name, "PRESIDENTIAL")}</p>
                </div>
              </Link>
              {/* <div className="moreInfoList">
                <p>SENATORIAL:</p>
                <p>{filterAgentType(lga.name, "SENATORIAL")}</p>
              </div>
              <div className="moreInfoList">
                <p>HOUSE OF REPS:</p>
                <p>{filterAgentType(lga.name, "HOUSE OF REPS")}</p>
              </div>
              <div className="moreInfoList">
                <p>HOUSE OF ASSEMBLY:</p>
                <p>{filterAgentType(lga.name, "HOUSE OF ASSEMBLY")}</p>
              </div> */}
              <Link
                passHref
                href={`/lga/agents/${userState}_${lga.name}_${selectedElectionType}_STATE`}
              >
                <div className="moreInfoList">
                  <p>STATE:</p>
                  <p>{filterAgentType(lga.name, "STATE")}</p>
                </div>
              </Link>
              <Link
                passHref
                href={`/lga/agents/${userState}_${lga.name}_${selectedElectionType}_LOCAL GOVERNMENT`}
              >
                <div className="moreInfoList">
                  <p>LOCAL GOVERNMENT</p>
                  <p>{filterAgentType(lga.name, "LOCAL GOVERNMENT")}</p>
                </div>
              </Link>
              <Link
                passHref
                href={`/lga/agents/${userState}_${lga.name}_${selectedElectionType}_WARD`}
              >
                <div className="moreInfoList">
                  <p>WARD:</p>
                  <p>{filterAgentType(lga.name, "WARD")}</p>
                </div>
              </Link>
              <Link
                passHref
                href={`/lga/agents/${userState}_${lga.name}_${selectedElectionType}_POLLING UNIT`}
              >
                <div className="moreInfoList">
                  <p>POLLING UNIT:</p>
                  <p>{filterAgentType(lga.name, "POLLING UNIT")}</p>
                </div>
              </Link>

              <div className="moreInfoList">
                <p>TOTAL:</p>
                <p>{calculateTotal(lga.name)}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="totalTile">
          <h4>Total Agent Count</h4>
          <p>{utils.numberWithCommas(agentsList.length)} agents</p>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
