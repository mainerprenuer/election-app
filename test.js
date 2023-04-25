import { Landing } from "../comps/global/Landing";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { usePaystackPayment } from "react-paystack";
import { async } from "@firebase/util";
import { ListOfRefCodes } from "../constants/refcode";
// import ListOfRefCodes from "../constants/refcode";

export default function Contact() {
  const dateToday = new Date(); // Mon Jun 08 2020 16:47:55 GMT+0800 (China Standard Time)
  const reference = Date.parse(dateToday);
  const [sponsor, setSponsor] = useState({
    name: "",
    email: "",
    phone: "",
    amount: 500,
    unit: 1,
    refcode: "",
    registrationDate: Date.now(),
  });

  const [continueBtn, setShowContinueBtn] = useState(false);
  const [entryValue, setEntryValue] = useState("");
  const [skipEntry, setSkipEntry] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [ReadOnly, setMakeAllReadOnly] = useState(false);
  const [refvalid, setRefValid] = useState(false);
  const [refLength, setRefLength] = useState(false);
  const [alreadyInuse, setAlreadyInUse] = useState("");
  // console.log(ListOfRefCodes);
  const config = {
    reference: reference,
    email: sponsor.email,
    amount: `${sponsor.amount}00`,
    // amount: `10000`,
    publicKey: "pk_live_bcddf6973cdcbd5811ae519ab726adb9cce4091f",
    phone: sponsor.phone,
    firstname: sponsor.name,
    metadata: sponsor,
  };

  const initializePayment = usePaystackPayment(config);

  const tester = async () => {
    await axios.post("https://rxedu-api.vercel.app/api/v1/sponsor", sponsor);
    console.log("test passed");
  };
  const handlePayment = () => {
    const onSuccess = async (reference) => {
      console.log("OnSucess");
      await axios.post("https://rxedu-api.vercel.app/api/v1/sponsor", sponsor);
    };

    const onClose = () => {
      // console.log("closed");
    };

    initializePayment(onSuccess, onClose);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "amount") {
      if (value.length > 12) value = value.slice(0, 12);
      sponsor.unit = Math.trunc(value / 500);
    }
    if (name == "phone") {
      if (value.length > 11) value = value.slice(0, 11);
    }
    if (name == "refcode") {
      if (value.length > 9) value = value.slice(0, 10);
      if (value.length <= 5) setRefLength(true);
      if (value.length >= 6 && value.length <= 10) {
        setRefLength(false);
        //! Verifying Refcode
      } else {
        setRefLength(true);
      }
    }
    setErrorMsg(false);
    setAlreadyInUse(false);
    setSponsor({ ...sponsor, [name]: value });
  };

  const handleChangeEntry = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);
    if (ListOfRefCodes.includes(value)) {
      setShowContinueBtn(true);
      setSponsor({ ...sponsor, refcode: value });
      // setCorrectRefCode(value);
      // console.log(value);
    } else {
      setShowContinueBtn(false);
    }

    setEntryValue(value);
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    if (
      sponsor.email &&
      sponsor.name &&
      sponsor.phone &&
      sponsor.unit &&
      sponsor.amount &&
      sponsor.refcode
    ) {
      if (sponsor.refcode.length > 6 && sponsor.refcode.length < 10) {
        setRefLength(false);
        console.log("Passed 1");

        try {
          const data = await axios.get(
            `https://rxedu-api.vercel.app/api/v1/sponsor_by_ref/?refcode=${sponsor.refcode}`
          );

          console.log(data.data.data[0]);
          if (data.data.data[0]) {
            setAlreadyInUse(true);
            setRefValid(false);
          } else {
            //! Proceed
            setRefValid(true);
            setMakeAllReadOnly(true);
            // handlePayment();
          }
          // console.log("SOmething found - Success");
        } catch (e) {
          setRefSearchMsg("Sorry an error occured");
        }
      } else {
        setRefLength(true);
      }
      handlePayment();
    } else {
      setErrorMsg(true);
      console.log("Something missing");
    }
  };

  return (
    <>
      <Landing
        title="Sponsor Agents"
        imgUrl="images/sponsor.jpg"
        subtitle="You can sponsor agents for"
        opacity={0.55}
      />
      {skipEntry ? (
        <div className="section formsPage contactUs">
          <motion.div
            className="sect "
            initial={{ x: "-100vw", opacity: 0.1 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.3, delay: 0.5, type: "tween" }}
          >
            <form className="form" action="#">
              <p>
                Each unit is per registration. Enter amount in multiples of ₦500
              </p>
              <div className="input_box">
                <label htmlFor="name" className="label">
                  Name
                </label>
                <input
                  required
                  readOnly={ReadOnly}
                  minLength={5}
                  id="name"
                  placeholder="Full name"
                  name="name"
                  value={sponsor.name}
                  onChange={handleChange}
                />
              </div>
              <div className="input_box">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  required
                  minLength={5}
                  readOnly={ReadOnly}
                  id="email"
                  placeholder="Enter email address"
                  name="email"
                  onChange={handleChange}
                  value={sponsor.email}
                />
              </div>
              <div className="input_box">
                <label htmlFor="phone" className="label">
                  Phone
                </label>
                <input
                  required
                  readOnly={ReadOnly}
                  id="phone"
                  placeholder="e.g 08123456789"
                  name="phone"
                  value={sponsor.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="input_box">
                <label htmlFor="refcode" className="label">
                  Ref Code
                </label>
                <input
                  required
                  // minLength={7}
                  readOnly
                  id="refcode"
                  placeholder="e.g your ref code"
                  name="refcode"
                  value={sponsor.refcode}
                  onChange={handleChange}
                />
                {refLength && (
                  <p className="errorMsg">Must be between 6 - 10 characters</p>
                )}
                {alreadyInuse && (
                  <p className="errorMsg">Ref Code already in use</p>
                )}
              </div>
              <div className="input_box">
                <label htmlFor="amount" className="label">
                  Enter Amount
                </label>
                <input
                  type="number"
                  required
                  readOnly={ReadOnly}
                  id="amount"
                  placeholder="Enter amount in ₦"
                  name="amount"
                  value={sponsor.amount}
                  onChange={handleChange}
                />
              </div>
              <div className="input_box">
                <label htmlFor="unit" className="label">
                  Unit
                </label>
                <input
                  type="number"
                  readOnly
                  required
                  minLength={5}
                  id="unit"
                  placeholder="0 agents"
                  name="unit"
                  value={sponsor.unit}
                  // onChange={handleChange}
                />
              </div>
              {errorMsg && (
                <p className="errorMsg">
                  Kindly review the form, something is missing
                </p>
              )}

              <div className="btnContainer">
                {refvalid ? (
                  <div className=" buttons">
                    <input
                      type="button"
                      value="Proceed to Payment"
                      onClick={handlePayment}
                      className="btn"
                    />
                  </div>
                ) : (
                  <div className=" buttons">
                    <input
                      type="button"
                      value="Validate"
                      onClick={handleSubmit}
                      className="btn"
                    />
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      ) : (
        <div className="section formsPage contactUs">
          <motion.div
            className="sect "
            initial={{ x: "-100vw", opacity: 0.1 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.3, delay: 0.5, type: "tween" }}
          >
            <form className="form" action="#">
              <p>Enter your Ref Code to Continue.</p>

              <div className="input_box">
                <label htmlFor="entryRef" className="label">
                  Ref Code
                </label>
                <input
                  id="entryRef"
                  placeholder="Enter ref code to proceed"
                  name="entryRef"
                  value={entryValue}
                  onChange={handleChangeEntry}
                />
              </div>
              {continueBtn && (
                <div className="btnContainer">
                  <div className=" buttons">
                    <input
                      type="button"
                      value="Continue"
                      onClick={() => setSkipEntry(true)}
                      className="btn"
                    />
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}
