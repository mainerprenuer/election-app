import React from "react";
import { motion } from "framer-motion";

export default function Form5({
  agent,
  stepIndex,
  agentParams,
  handleChange,
  handlePrev,
  handleNext,
  validateForm,
  showErrorMsg,
  profileImage,
}) {
  const styleHide = "hide";
  const styleShow = "show";
  return (
    <motion.div
      className={`sect step5 ${stepIndex === 4 ? styleShow : styleHide}`}
      initial={{ x: "-100vw", opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.7, delay: 1, type: "tween" }}
    >
      <div className="preview">
        <h2>
          Step 5 <span> Preview</span>
        </h2>

        {/* <img src={profileImage} alt="Selected image" /> */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            <tr className="profileImage">
              <td>Photo</td>
              <td>
                {profileImage ? (
                  <img src={profileImage} alt="Selected image" />
                ) : (
                  <p className="errorMsg">Select an image less than 200kb</p>
                )}
              </td>
            </tr>
            <tr>
              <td>First Name</td>
              <td>{agent.firstName}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{agent.lastName}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{agent.gender}</td>
            </tr>
            <tr>
              <td>Date of Birth</td>
              <td>{agent.dateOfBirth}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{agent.email}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{agent.phone}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{agent.address}</td>
            </tr>
            <tr>
              <td>State</td>
              <td>{agent.state}</td>
            </tr>
            <tr>
              <td>LGA</td>
              <td>{agent.lga}</td>
            </tr>
            <tr>
              <td>Ward</td>
              <td>{agent.ward}</td>
            </tr>
            <tr>
              <td>Agent Type</td>
              <td>{agent.agentType}</td>
            </tr>
            <tr>
              <td>Election Type</td>
              <td>{agent.electionType}</td>
            </tr>
            <tr>
              <td>Polling Unit</td>
              <td>{agent.pollingUnit}</td>
            </tr>
            <tr>
              <td>Bank</td>
              <td>{agent.bankName}</td>
            </tr>
            <tr>
              <td>Account No.</td>
              <td>{agent.accountNumber}</td>
            </tr>
            <tr>
              <td>NIN </td>
              <td>{agent.nin} </td>
            </tr>
            {/* <tr>
              <td>Profile Picture</td>
              <td>{agent.image}</td>
            </tr> */}
          </tbody>
        </table>
        {showErrorMsg && <p className="errorMsg">Some fields are empty.</p>}
      </div>
      <div className="btnContainer">
        <div className=" buttons">
          <input
            type="button"
            value="Go Back"
            onClick={handlePrev}
            className="btn"
          />
        </div>
        {/* <div className="buttons">
          <input
            type="submit"
            value="Submit"
            onClick={handleSubmit}
            className="btn"
          />
        </div> */}
        <div className="buttons">
          <input
            type="submit"
            value="Next"
            onClick={validateForm}
            className="btn"
          />
        </div>
      </div>
    </motion.div>
  );
}
