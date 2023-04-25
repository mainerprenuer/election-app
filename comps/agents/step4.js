import React from "react";
import { motion } from "framer-motion";

export default function Form4({
  agent,
  stepIndex,
  handleChange,
  handlePrev,
  handleNext,
  banks,
}) {
  const styleHide = "hide";
  const styleShow = "show";
  return (
    <motion.div
      className={`sect step4 ${stepIndex === 3 ? styleShow : styleHide}`}
      initial={{ x: "-100vw", opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.7, delay: 1, type: "tween" }}
    >
      <form onSubmit={handleNext} className="form">
        <h2>Step 4</h2>
        <div className="input_box">
          <label htmlFor="form-nin" className="label">
            NIN
          </label>
          <input
            id="form-nin"
            required
            placeholder="National Identity Number"
            name="nin"
            type="number"
            maxLength={17}
            value={agent.nin}
            onChange={handleChange}
          />
        </div>

        <div className="input_box">
          <label htmlFor="form-bank" className="label">
            BANK
          </label>
          <select
            name="bankName"
            id="form-bank"
            value={agent.bankName}
            onChange={handleChange}
          >
            {/* {agentParams.bankNames.map((_val, index) => { */}
            {banks.map((_val, index) => {
              return (
                <option value={_val} key={index}>
                  {_val}
                </option>
              );
            })}
          </select>
        </div>

        <div className="input_box">
          <label htmlFor="form-account-number" className="label">
            Account Number
          </label>
          <input
            type="number"
            id="form-account-number"
            value={agent.accountNumber}
            minLength={10}
            maxLength={15}
            placeholder="e.g 2091234567"
            name="accountNumber"
            // value={ques.category}
            onChange={handleChange}
          />
        </div>

        <div className="input_box">
          <label htmlFor="form-image">Profile Image</label>
          <input
            type="file"
            id="form-image"
            name="image"
            value={agent.image}
            onChange={handleChange}
            accept="image/*"
          />
        </div>
      </form>
      <div className="btnContainer">
        <div className=" buttons">
          <input
            type="button"
            value="Go Back"
            onClick={handlePrev}
            className="btn"
          />
        </div>
        <div className="buttons">
          <input
            type="submit"
            value="Next"
            onClick={handleNext}
            className="btn"
          />
        </div>
      </div>
    </motion.div>
  );
}
