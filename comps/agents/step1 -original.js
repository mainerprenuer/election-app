import React from "react";
import { motion } from "framer-motion";

export default function Form1({
  agent,
  stepIndex,
  handleChange,
  data,
  localGov,
  handleNext,
  wards,
}) {
  const styleHide = "hide";
  const styleShow = "show";
  const errorMsgs = [];
  function validateStep1() {
    if (agent.name || agent.name.length < 10) {
      errorMsgs.push("Name must be more than 10 characters");
    }
  }
  return (
    <motion.div
      className={`sect step1 ${stepIndex === 0 ? styleShow : styleHide}`}
      initial={{ x: "-100vw", opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.3, delay: 0.5, type: "tween" }}
    >
      <form onSubmit={handleNext} className="form">
        <h2>
          Step 1 <span>Personal Details</span>
        </h2>

        <div className="input_box">
          <label htmlFor="firstName" className="label">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            name="firstName"
            required
            maxLength={11}
            value={agent.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="input_box">
          <label htmlFor="formLastName" className="label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Last name"
            name="lastName"
            required
            maxLength={11}
            value={agent.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="input_box">
          <label htmlFor="form-email" className="label">
            Email
          </label>
          <input
            type="text"
            required
            minLength={5}
            id="form-email"
            placeholder="Enter email address"
            name="email"
            value={agent.email}
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
            value={agent.phone}
            onChange={handleChange}
          />
        </div>
        <div className="input_box">
          <label htmlFor="form-address" className="label">
            Address
          </label>
          <input
            type="text"
            id="form-address"
            required
            placeholder="Home Address"
            name="address"
            value={agent.address}
            onChange={handleChange}
          />
        </div>
        <div className="btnContainer">
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
