import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import { data } from "../../constants/states";
import { agentParams } from "../../constants/agentparams";
import { banks } from "../../constants/banks";
import { storage } from "../../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Form1 from "../../comps/agents/step1";
import Form2 from "../../comps/agents/step2";
import Form3 from "../../comps/agents/step3";
import Form4 from "../../comps/agents/step4";
import Form5 from "../../comps/agents/step5";
import Form6 from "../../comps/agents/step6";
import Form7 from "../../comps/agents/step7";

export default function AddAgentsPage() {
  const router = useRouter();
  //! Logged In User
  const [userPresent, setUserPresentUser] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    statecode: "",
    img: "",
    userType: "",
  });
  // handleLength
  //! State Variables
  const [previewImage, setPreviewimage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [agentTypeList, setAgentTypeList] = useState([]);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [localGov, setLocalGov] = useState([]);
  const [wards, setWards] = useState([]);
  const [imgUrl, setImgUrl] = useState(null);
  const [hasTempImage, setTempImage] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  //! Show TextForm
  const [showSenatorialDistrict, setShowSenatorialDistrict] = useState(false);
  const [showFedConst, setFedCosnt] = useState(false);
  const [showStateConst, setStateConst] = useState(false);
  const [senatorial_district, setSenatorial_district] = useState([]);
  const [agent, setAgent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    state: user ? user.statecode : "",
    lga: "",
    ward: "",
    electionType: "",
    agentType: "",
    bankName: "",
    accountNumber: "",
    image: "",
    pollingUnit: "",
    status: "NEW",
    isApproved: false,
    registrationDate: new Date(),
    transactionRef: "",
    nin: "",
    sponsorCode: "",
    sponsored: false,
    isAgent: false,
    dateOfBirth: "",
    gender: "MALE",
  });

  const HOU = "HOUSE OF REPS.";
  const STAT = "STATE HOUSE OF ASSEMBLY";
  const SEN = "SENATORIAL";
  const GUBA = "GUBERNATORIAL";
  const PRES = "PRESIDENTIAL";

  useEffect(() => {
    if (!fetchUser()) {
      // router.push("/");
    } else {
      // console.log("fetchUser");
      // console.log(fetchUser());
      setUser(fetchUser());
      setUserPresentUser(true);
    }
  }, []);

  function fetchUser() {
    var userObj = JSON.parse(localStorage.getItem("user"));
    setUser(userObj);
    return userObj;
  }

  function postAgent(agent) {
    Axios.post("https://rxedu-api.vercel.app/api/v1/agent", agent)
      .then((response) => {
        const objID = response.data.data._id;
        router.push(`/thanks/${objID}`);
        // console.log("Successfully Sent to: ");
        // console.log(response.data);
        // if (userPresent) {
        //   router.push("/thanks");
        // } else {
        //   router.push("/thanks");
        // }
        setIsSuccessful(true);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.msg);
        console.log("Opps an error ocured");
        router.reload(window.location.pathname);
      });
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    var selectedState;

    // if (userPresent) {
    if (userPresent) {
      selectedState = data.states.filter(
        (_val) => _val.state.toLowerCase() === user.name.toLowerCase()
      );
      console.log("selectedState");
      console.log(selectedState);
      console.log("user");
      console.log(user);
      setLocalGov(selectedState[0].lga);
      agent.state = user.name;
    }

    if (name == "state") {
      setWards([]);
      setLocalGov([]);
      if (!userPresent) {
        selectedState = data.states.filter((_val) => _val.state == value);
      }

      setLocalGov(selectedState[0].lga);
    } else if (name == "lga") {
      const selectedLocalGov = localGov.filter((_val) => _val.name == value);
      setWards(selectedLocalGov[0].wards);
    } else if (name == "image") {
      const _file = e.target.files[0];
      if (_file) {
        if (_file.size < 200000) {
          // setTempImage()
          setProfileImage(_file);
          handleConversion(_file);
          console.log("Hurray! we have a file");
        } else {
          // value = null;
          setProfileImage(null);
          console.log(_file);
          alert("Image is above 200kb");
        }
      } else {
        console.log("no file yet");
      }
    } else if (name == "electionType") {
      if (value == PRES) {
        setAgentTypeList([
          "PRESIDENTIAL",
          "STATE",
          "LOCAL GOVERNMENT",
          "WARD",
          "POLLING UNIT",
        ]);
        setFedCosnt(false);
        setStateConst(false);
        setShowSenatorialDistrict(false);
      } else if (value == HOU) {
        setFedCosnt(true);
        setStateConst(false);
        setShowSenatorialDistrict(false);
        setAgentTypeList([
          "HOUSE OF REPS",
          "LOCAL GOVERNMENT",
          "WARD",
          "POLLING UNIT",
        ]);
      } else if (value == STAT) {
        setFedCosnt(false);
        setStateConst(true);
        setShowSenatorialDistrict(false);
        setAgentTypeList(["HOUSE OF ASSEMBLY", "WARD", "POLLING UNIT"]);
      } else if (value == GUBA) {
        setFedCosnt(false);
        setStateConst(false);
        setShowSenatorialDistrict(false);
        setAgentTypeList(["STATE", "LOCAL GOVERNMENT", "WARD", "POLLING UNIT"]);
      } else if (value == SEN) {
        setFedCosnt(false);
        setStateConst(false);
        setShowSenatorialDistrict(true);
        setAgentTypeList([
          "SENATORIAL",
          "LOCAL GOVERNMENT",
          "WARD",
          "POLLING UNIT",
        ]);
      }
    } else if (name == "email") {
      value = value.toLowerCase();
    }

    if (name == "phone") {
      if (value.length > 11) value = value.slice(0, 11);
    }
    if (name == "nin") {
      if (value.length > 11) value = value.slice(0, 11);
    }
    if (name == "accountNumber") {
      if (value.length > 10) value = value.slice(0, 10);
    }

    // if (name == "dateOfBirth") {
    //   console.log(Date.parse(value).toPrecision());
    //   console.log(Date(value));
    // }

    setAgent({ ...agent, [name]: value });
    console.log(agent);
  };

  function handleLength(value, maxLength) {
    var val;
    if (value.length > maxLength) {
      val = value.slice(0, 11);
    }
    return val;
  }

  const handlePrev = (e) => {
    e.preventDefault();
    setShowErrorMsg(false);
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };
  const handleNext = (e) => {
    e.preventDefault();
    if (stepIndex <= 4) {
      setStepIndex(stepIndex + 1);
    }
  };

  async function uploadImageToFb() {
    console.log("Inside Upload");
    if (profileImage == null) {
      alert("Select a image");
      return;
    } else {
      console.log("Started Upload");
      const imageRef = ref(storage, `apcaims/${profileImage.name + v4()}`);
      uploadBytes(imageRef, profileImage).then((res) => {
        getDownloadURL(res.ref).then((url) => {
          console.log(`Valid Url: ${url}`);
          agent.image = url;
          postAgent(agent);
        });
      });
    }
  }

  const validateForm = async (e) => {
    setShowErrorMsg(false);
    if (
      agent.firstName &&
      agent.lastName &&
      agent.email &&
      agent.address &&
      agent.phone &&
      agent.state &&
      agent.lga &&
      agent.ward &&
      agent.status &&
      agent.agentType &&
      agent.image &&
      agent.accountNumber &&
      agent.nin &&
      profileImage &&
      agent.dateOfBirth &&
      agent.gender &&
      agent.pollingUnit
    ) {
      e.preventDefault();
      console.log("Before Upload");
      setStepIndex(stepIndex + 1);
    } else {
      // console.log(agent);
      // setShowErrorMsg(true);
      console.log("Something is missing");
    }
  };

  const handleConversion = useCallback(async (_file) => {
    const base64 = await convertToBase64(_file);
    setPreviewimage(base64);
    // console.log(base64);
  });

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (!file) {
        alert("Please select a image");
      } else {
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
      }
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  //! Paystack Payment Gateway

  return (
    <div className="addAgent">
      <Form1
        agent={agent}
        stepIndex={stepIndex}
        handleChange={handleChange}
        data={data}
        localGov={localGov}
        handleNext={handleNext}
        wards={wards}
      />
      <Form2
        agent={agent}
        stepIndex={stepIndex}
        handleChange={handleChange}
        data={data}
        localGov={localGov}
        userPresent={userPresent}
        // userState={user.statecode}
        user={user}
        wards={wards}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      <Form3
        agent={agent}
        stepIndex={stepIndex}
        agentParams={agentParams}
        showSenatorialDistrict={showSenatorialDistrict}
        handleChange={handleChange}
        handlePrev={handlePrev}
        handleNext={handleNext}
        senatorial_district={senatorial_district}
        showFedConst={showFedConst}
        showStateConst={showStateConst}
        agentTypeList={agentTypeList}
      />
      <Form4
        agent={agent}
        stepIndex={stepIndex}
        // handleSubmit={handleSubmit}
        agentParams={agentParams}
        handleChange={handleChange}
        handlePrev={handlePrev}
        handleNext={handleNext}
        banks={banks}
      />

      <Form5
        agent={agent}
        stepIndex={stepIndex}
        // handleSubmit={handleSubmit}
        agentParams={agentParams}
        handleChange={handleChange}
        handlePrev={handlePrev}
        handleNext={handleNext}
        showErrorMsg={showErrorMsg}
        profileImage={previewImage}
        validateForm={validateForm}
        setPreviewimage={setPreviewimage}
      />

      <Form6
        agent={agent}
        stepIndex={stepIndex}
        setAgent={setAgent}
        agentParams={agentParams}
        handleChange={handleChange}
        handlePrev={handlePrev}
        handleNext={handleNext}
        showErrorMsg={showErrorMsg}
        profileImage={previewImage}
        setPreviewimage={setPreviewimage}
        uploadImageToFb={uploadImageToFb}
        setStepIndex={setStepIndex}
        postAgent={postAgent}
      />

      <Form7
        agent={agent}
        stepIndex={stepIndex}
        // handleSubmit={handleSubmit}
        agentParams={agentParams}
        handleChange={handleChange}
        handlePrev={handlePrev}
      />
    </div>
  );
}
