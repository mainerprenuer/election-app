import React from "react";
import { data } from "../../constants/states/index";
import {
  lgaList,
  listItem,
  agentType,
  content,
} from "../../styles/lgalist.module.scss";

export default function LgaList({ state }) {
  const selectedLg = data.states.filter((val) =>
    val.state.toLowerCase().includes(state.toLowerCase())
  );
  return (
    <div className={lgaList}>
      <h3> {state} - Local Governments</h3>
      <div>
        {selectedLg[0].lga.map((lga, index) => (
          <div key={index} className={listItem}>
            {index + 1}. {lga.name}
            <div className={content}>
              <p>Total Agent Count</p>
              <div className={agentType}>
                <h5>PRESIDENTIAL</h5>
                <h5>PRESIDENTIAL</h5>
                <h5>PRESIDENTIAL</h5>
                <h5>PRESIDENTIAL</h5>
              </div>
              <hr />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
