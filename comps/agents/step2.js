import React from "react";
import { motion } from "framer-motion";

export default function Form2({
  agent,
  stepIndex,
  handleChange,
  userPresent,
  data,
  localGov,
  userState,
  wards,
  handleNext,
  handlePrev,
  user,
}) {
  const styleHide = "hide";
  const styleShow = "show";

  return (
    <motion.div
      className={`sect step2 ${stepIndex === 1 ? styleShow : styleHide}`}
      initial={{ x: "-100vw", opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.3, delay: 0.5, type: "tween" }}
    >
      <form onSubmit={handleNext} className="form">
        <h2>
          Step 2 <span>Location Details</span>
        </h2>
        {!userPresent && (
          <div className="input_box">
            <label htmlFor="form-state">State</label>
            <select
              name="state"
              onChange={handleChange}
              value={agent.state}
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
        )}

        <div className="input_box">
          <label htmlFor="form-lga">LGA</label>
          <select
            name="lga"
            onChange={handleChange}
            value={agent.lga}
            required
            id="form-lga"
          >
            <option disabled={true}>Select a LGA</option>

            {localGov.map((_val, index) => {
              return (
                <option value={_val.name} key={index}>
                  {_val.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="input_box">
          <label htmlFor="form-ward">Wards</label>
          <select
            name="ward"
            value={agent.ward}
            onChange={handleChange}
            required
            id="form-ward"
          >
            <option disabled={true}>Select a ward</option>
            {wards.map((_val, index) => {
              return (
                <option value={_val} key={index}>
                  {_val}
                </option>
              );
            })}
          </select>
        </div>
        <div className="input_box">
          <label htmlFor="form-polling-unit" className="label">
            Polling Unit
          </label>
          <input
            type="number"
            id="form-polling-unit"
            placeholder="eg 001, 002"
            name="pollingUnit"
            value={agent.pollingUnit}
            required
            minLength={3}
            onChange={handleChange}
          />
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
              //   onClick={handleNext}
              className="btn"
            />
          </div>
        </div>
      </form>
    </motion.div>
  );
}
