import { useMutation, gql } from "@apollo/client";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { data } from "../../constants/states/index";

export default function AddLga() {
  const [localGovs, setLocalGov] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedLga, setSelectedLga] = useState("");

  const handleChange = (e) => {
    const selectedState = e.target.value;

    const selection = data.states.filter((_val) => _val.state == selectedState);

    setLocalGov(selection[0].lga);
  };

  const handleOnLgaClick = (lga) => {
    setSelectedLga(lga);
    const selectedLocalGov = localGovs.filter((_val) => _val.name == lga);
    setWards(selectedLocalGov[0].wards);
  };

  return (
    <>
      <div className="lgaWardInfo">
        <div className="item">
          <h3>Get LGAs</h3>
          <form className="form">
            <div className="input_box">
              <label htmlFor="form-state">State</label>
              <select
                name="state"
                onChange={handleChange}
                // value={agent.state}
                required
                id="form-state"
              >
                <option disabled>Select a state</option>

                {data.states.map((_val, index) => {
                  return (
                    <option value={_val.state.toUpperCase()} key={index}>
                      {_val.state}
                    </option>
                  );
                })}
              </select>
            </div>
          </form>
          <div className="lgaList">
            <h3>List of LGAs</h3>
            {localGovs.map((lga, index) => (
              <div
                key={index}
                className={
                  selectedLga == lga.name ? "selectedListItem" : "listItem"
                }
              >
                {index + 1}. <span className="lgaTitle">{lga.name}</span>
                <CopyToClipboard
                  text={lga.name.trim()}
                  // onClick={() => handleOnLgaClick(lga.name)}
                >
                  <button onClick={() => handleOnLgaClick(lga.name)}>
                    Copy
                  </button>
                </CopyToClipboard>
              </div>
            ))}
          </div>
        </div>
        <div className="item">
          <div>
            <div className="lgaList">
              <h3>Wards for {selectedLga}</h3>
              {wards.map((ward, index) => (
                <div key={index} className="listItem">
                  {index + 1}. <span className="lgaTitle">{ward}</span>
                  <CopyToClipboard text={ward.trim()}>
                    <button>Copy</button>
                  </CopyToClipboard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <a href="https://drive.google.com/drive/folders/1gQQ6Es-2xer6QWJCQxpNpQ2x3D3ZtKzH">
          Polling Unit Spread Sheet
        </a>
      </div>
    </>
  );
}
