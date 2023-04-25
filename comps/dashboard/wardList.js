import React from "react";
import { data } from "../../constants/states/index";
import {
  wardList,
  listItem,
  agentType,
  content,
} from "../../styles/wardlist.module.scss";

export default function WardList({ state }) {
  let wardList = [];

  const selectedLg = data.states.filter((val) =>
    val.state.toLowerCase().includes(state.toLowerCase())
  );

  return (
    <div className={wardList}>
      <h3>Wards</h3>
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
