import React, { useState } from "react";
import { motion } from "framer-motion";
import { agentParams } from "../constants/agentparams";
import { useRouter } from "next/router";
import {
  editpage,
  card,
  headings,
  successMsg,
  loadingMsg,
  dataItem,
  errorMsg,
} from "../styles/edit_page.module.scss";
import axios from "axios";

export default function EditAgentComp({ agentInfo }) {
  const router = useRouter();

  const HOU = "HOUSE OF REPS.";
  const STAT = "STATE HOUSE OF ASSEMBLY";
  const SEN = "SENATORIAL";
  const GUBA = "GUBERNATORIAL";
  const PRES = "PRESIDENTIAL";

  const [agent, setAgent] = useState(agentInfo);
  const [updateSuccessful, setUpdateSuccessful] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [hasErrorMsg, setShowErrorMsg] = useState(false);

  const [agentTypeList, setAgentTypeList] = useState([]);
  const [newValues, setNewValue] = useState({
    agentType: "",
    electionType: PRES,
    phone: "",
    email: "",
  });
  // TODO: Set conditionals for the listTypes

  const handleChange = (e) => {
    e.preventDefault();
    setShowErrorMsg(false);
    setLoading(false);
    const name = e.target.name;
    const value = e.target.value;
    if (name == "electionType") {
      if (value == PRES) {
        setAgentTypeList([
          "PRESIDENTIAL",
          "STATE",
          "LOCAL GOVERNMENT",
          "WARD",
          "POLLING UNIT",
        ]);
      } else if (value == HOU) {
        setAgentTypeList([
          "HOUSE OF REPS",
          "LOCAL GOVERNMENT",
          "WARD",
          "POLLING UNIT",
        ]);
      } else if (value == STAT) {
        setAgentTypeList(["HOUSE OF ASSEMBLY", "WARD", "POLLING UNIT"]);
      } else if (value == GUBA) {
        setAgentTypeList(["STATE", "LOCAL GOVERNMENT", "WARD", "POLLING UNIT"]);
      } else if (value == SEN) {
        setAgentTypeList([
          "SENATORIAL",
          "LOCAL GOVERNMENT",
          "WARD",
          "POLLING UNIT",
        ]);
      }
    }
    if (name == "phone") {
      if (value.length > 11) value = value.slice(0, 11);
    }
    setNewValue({ ...newValues, [name]: value });
  };
  const updateInformation = async (newData) => {
    await axios.patch(
      `https://rxedu-api.vercel.app/api/v1/agent/${agent._id}`,
      newData
    );
    // console.log("Updated successfully");
    setUpdateSuccessful(true);
    setLoading(false);
    window.setTimeout(() => {
      router.reload(window.location.pathname);
    }, 2000);
  };
  const handleSubmit = (e) => {
    console.log("In submit func");
    if (newValues.agentType && newValues.electionType && newValues.phone) {
      if (newValues.email.length > 9) {
        console.log("Submit Pass");
        setLoading(true);
        console.log(newValues);
        updateInformation(newValues);
        // 07067332341;
      } else {
        setShowErrorMsg(true);
      }
    } else {
      console.log(newValues);
    }
  };

  return (
    <div className={editpage}>
      <motion.div
        className={card}
        initial={{ x: "-100vw", opacity: 0.1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.7, delay: 1, type: "tween" }}
      >
        <div className="form">
          <h2>
            {agent.firstName} {agent.lastName}'s Data
          </h2>
          <div className={headings}>
            <h3>Previous Data</h3>
            <div className={dataItem}>
              <p>Election Type: </p>
              <p>{agent.electionType}</p>
            </div>
            <div className={dataItem}>
              <p>Agent Type: </p>
              <p>{agent.agentType}</p>
            </div>
            <div className={dataItem}>
              <p>Email: </p>
              <p>{agent.email}</p>
            </div>
            <div className={dataItem}>
              <p>Phone: </p>
              <p>{agent.phone}</p>
            </div>

            {/* <h3>Select new group</h3> */}
          </div>
          <div className="input_box">
            <label htmlFor="form-election-type">Election Type</label>
            <select
              name="electionType"
              value={newValues.electionType}
              id="form-election-type"
              required
              onChange={handleChange}
            >
              <option>Select a election type</option>
              {agentParams.electionTypes.map((_val, index) => {
                return (
                  <option value={_val.title} key={index}>
                    {_val.title}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="input_box">
            <label htmlFor="form-category">Agent Type</label>
            <select
              name="agentType"
              id="form-category"
              value={newValues.agentType}
              onChange={handleChange}
            >
              {agentTypeList.map((_val, index) => {
                return (
                  <option value={_val} key={index}>
                    {`${_val} AGENT`}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="input_box">
            <label htmlFor="form-email" className="label">
              Email
            </label>
            <input
              type="text"
              required
              minLength={9}
              maxLength={34}
              id="form-email"
              placeholder="Enter email address"
              name="email"
              value={newValues.email}
              onChange={handleChange}
            />
          </div>

          <div className="input_box">
            <label htmlFor="form-phone" className="label">
              Phone Number
            </label>
            <input
              type="number"
              required
              id="form-phone"
              minLength={11}
              maxLength={15}
              placeholder="e.g 08101234567"
              name="phone"
              value={newValues.phone}
              onChange={handleChange}
            />
          </div>

          <div className="btnContainer">
            <div className="buttons">
              <input
                type="submit"
                value="Update"
                onClick={handleSubmit}
                className="btn"
              />
            </div>
          </div>
          {isLoading && (
            <div className={loadingMsg}>
              <p>Updating...</p>
            </div>
          )}
          {updateSuccessful && (
            <div className={successMsg}>
              <p>Updated successfully!</p>
            </div>
          )}
          {hasErrorMsg && (
            <div className={errorMsg}>
              <p>Ensure all fields are properly filled. </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
