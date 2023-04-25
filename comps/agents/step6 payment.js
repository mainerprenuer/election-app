import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePaystackPayment } from "react-paystack";
import axios from "axios";

export default function Form6({
  agent,
  stepIndex,
  handlePrev,
  setAgent,
  // handlePayment,
  uploadImageToFb,
  postAgent,
  setStepIndex,
}) {
  const styleHide = "hide";
  const styleShow = "show";
  // const reference = `${new Date()}`;
  const dateToday = new Date(); // Mon Jun 08 2020 16:47:55 GMT+0800 (China Standard Time)
  const reference = Date.parse(dateToday);
  const [refCode, setRefCode] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  // #500
  const config = {
    reference: reference,
    email: agent.email,
    amount: 50000,
    publicKey: "pk_live_bcddf6973cdcbd5811ae519ab726adb9cce4091f",
    phone: agent.phone,
    firstname: agent.firstName,
    lastname: agent.lastName,
    metadata: agent,
  };
  const initializePayment = usePaystackPayment(config);

  const handlePayment = () => {
    const onSuccess = (reference) => {
      console.log("OnSucess");
      setAgent({ ...agent, isApproved: true, transactionRef: reference });
      // agent.transactionRef = reference;
      // agent.isApproved = true;
      setStepIndex(6);
      uploadImageToFb();
    };

    const onClose = () => {
      // console.log("closed");
    };

    initializePayment(onSuccess, onClose);
  };

  const tester = () => {
    const _reference = Date.UTC.toString();
    agent.transactionRef = _reference;
    agent.isApproved = true;
    agent.image = "_reference";

    setStepIndex(6);
    // uploadImageToFb();
    postAgent(agent);
  };

  const handleSponsor = async (e) => {
    // e.preventDefault();

    //! Fetch sponsor by code
    try {
      var data = await axios.get(
        `https://rxedu-api.vercel.app/api/v1/sponsor/${refCode}`
      );
      // console.log(data);
      var doc = data.data;
      // console.log(doc);
      // console.log(doc.doc);
      // console.log(doc.doc.unit);
      var sponsor = doc.doc;

      if (sponsor.unit > 0) {
        console.log("sponsor.unit");
        //! get unit left/count
        console.log(sponsor.unit);
        console.log(sponsor._id);
        await axios.patch(
          `https://rxedu-api.vercel.app/api/v1/sponsor/${sponsor._id}`,
          { unit: sponsor.unit-- }
        );
        setShowSubmit(true);
      }
    } catch (e) {
      console.log(e);
    }

    //! get unit left/count
    // var doc = data.doc;
    // //! if above 1 deduct one and update the sponsors count
    // if (doc.unit > 0) {
    //   await axios.patch(
    //     `https://rxedu-api.vercel.app/api/v1/sponsor/${refCode}`,
    //     {
    //       unit: doc.unit--,
    //     }
    //   );
    //   setShowSubmit(true);
    // }

    //! the post the agents details
  };

  const submitFile = () => {
    setAgent({ ...agent, isApproved: true, transactionRef: refCode });
    setStepIndex(6);
    uploadImageToFb();
  };

  const handleChangeRef = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "sponsorsCode") {
      if (value.length > 15) value = value.slice(0, 15);
    }
    setRefCode(value);
    console.log(refCode);
  };

  return (
    <motion.div
      className={`sect step5 ${stepIndex === 5 ? styleShow : styleHide}`}
      initial={{ x: "-100vw", opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.7, delay: 1, type: "tween" }}
    >
      <form className="form">
        <div className="payment">
          <h2>
            Step 6 <span> Payment</span>
          </h2>
          <p>
            You are to make a payment of just five hundred naira (₦500) to
            complete this registration.
          </p>
          <p>Click Proceed to continue.</p>
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
            onClick={tester}
            className="btn"
          />
        </div> */}
          <div className="buttons">
            <input
              type="submit"
              value="Proceed"
              onClick={handlePayment}
              className="btn"
            />
          </div>
        </div>

        {/* <div className="payment">
          <h2>Sponsored</h2>
          <p>If you have a sponsor kindly enter their reference code.</p>
        </div>

        <div className="input_box">
          <label htmlFor="form-sponsorsCode" className="label">
            Sponsors Code
          </label>
          <input
            id="form-sponsorsCode"
            placeholder="Ref Code"
            name="sponsorsCode"
            value={refCode}
            onChange={handleChangeRef}
            // value={ques.category}
          />
        </div>

        {!showSubmit && (
          <div className="btnContainer">
            <div className="buttons">
              <input
                type="button"
                value="Proceed"
                onClick={handleSponsor}
                className="btn"
              />
            </div>
          </div>
        )} */}

        {/* {showSubmit && (
          <div className="btnContainer">
            <div className="buttons">
              <input
                type="button"
                value="Submit"
                onClick={submitFile}
                className="btn"
              />
            </div>
          </div>
        )} */}
      </form>
    </motion.div>
  );
}

//  <div className="loader">
//    <Circles
//      height="200"
//      width="200"
//      color="#1663b0"
//      ariaLabel="circles-loading"
//      // wrapperStyle={{}}
//      // wrapperClass=""
//      visible={true}
//    />
//  </div>;
