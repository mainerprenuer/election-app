import React from "react";
import { motion } from "framer-motion";

export default function Form3({
  agent,
  stepIndex,
  agentParams,
  showSenatorialDistrict,
  handlePrev,
  handleNext,
  handleChange,
  senatorial_district,
  showStateConst,
  showFedConst,
  agentTypeList,
}) {
  const styleHide = "hide";
  const styleShow = "show";
  return (
    <motion.div
      className={`sect step3 ${stepIndex === 2 ? styleShow : styleHide}`}
      initial={{ x: "-100vw", opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.7, delay: 1, type: "tween" }}
    >
      <form onSubmit={handleNext} className="form">
        <h2>
          Step 3<span>Election & Agent Type</span>
        </h2>
        <div className="input_box">
          <label htmlFor="form-election-type">Election Type</label>
          <select
            name="electionType"
            value={agent.electionType}
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
        {/* <div className="input_box">
          <label htmlFor="form-election-type">AGENT Type</label>
          <select
            name="agentType"
            value={agent.agentType}
            id="form-election-type"
            required
            onChange={handleChange}
          >
            <option>Select a election type</option>
            {agentTypeList.map((_val, index) => {
              return (
                <option value={_val.title} key={index}>
                  {_val.title}
                </option>
              );
            })}
          </select>
        </div> */}
        {/* {showSenatorialDistrict && (
          <div className="input_box">
            <label htmlFor="form-election-type">Senatorial District</label>
            <select
              name="senatorialDistrict"
              id="form-election-type"
              onChange={handleChange}
              // value={agent.senatorialDistrict}
              value="ABIA"
            >
              <option disabled={true}>Select a election type</option>
              {senatorial_district.sd.map((_val, index) => {
                return (
                  <option value={_val.name} key={index}>
                    {_val.name}
                  </option>
                );
              })}
            </select>
          </div>
        )} */}
        {showSenatorialDistrict && (
          <div className="input_box">
            <label htmlFor="form-senatorial" className="label">
              Senatorial District
            </label>
            <input
              type="text"
              id="form-senatorial"
              placeholder="Enter Senatorial District"
              name="senatorial_district"
              required
              minLength={3}
              onChange={handleChange}
            />
          </div>
        )}
        {showFedConst && (
          <div className="input_box">
            <label htmlFor="form-fed_const" className="label">
              Federal Constituency
            </label>
            <input
              type="text"
              id="form-fed_const"
              placeholder="Enter Fedral Constituency"
              name="fed_const"
              required
              minLength={3}
              onChange={handleChange}
            />
          </div>
        )}
        {showStateConst && (
          <div className="input_box">
            <label htmlFor="form-state_const" className="label">
              State Constituency
            </label>
            <input
              type="text"
              id="form-state_const"
              placeholder="Enter State Constituency"
              name="state_const"
              required
              minLength={3}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="input_box">
          <label htmlFor="form-category">Agent Type</label>
          <select
            name="agentType"
            id="form-category"
            value={agent.agentType}
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
        <div className="btnContainer">
          <div className=" buttons">
            <input
              type="submit"
              value="Go Back"
              onClick={handlePrev}
              className="btn"
            />
          </div>
          <div className="buttons">
            <input
              type="submit"
              value="Next"
              // onClick={handleNext}
              className="btn"
            />
          </div>
        </div>
      </form>
    </motion.div>
  );
}
