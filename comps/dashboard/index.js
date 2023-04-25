import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { data } from "../../constants/states/index";
import { utils } from "../../utils";
import { MdPersonAddAlt1, MdGroups } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { bgColors } from "../../constants/chartColors";
import LgaList from "../../comps/dashboard/lgaList";
import WardList from "./wardList";
import StateList from "./stateList";
// import {
//   dasboardWrapper,
//   spacer,
//   headingSection,
//   dashboard,
//   topCard,
//   orange,
//   tabSection,
//   active,
// } from "../../styles/dashboard.module.scss";

export default function DashboardComp({ agentsList, userState = "DELTA" }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    statecode: "",
    img: "",
    userType: "",
  });

  const getAllWards = () => {
    let all_wards = [];
    getAllLga[0].lga.map((lga) => {
      all_wards.concat(lga.wards);
      lga.wards.map((val) => all_wards.push(val));
    });
    return all_wards.length;
  };

  const getAllLga = data.states.filter((val) =>
    val.state.toLowerCase().includes(userState.toLowerCase())
  );

  const selectedLg = data.states.filter((val) =>
    val.state.toLowerCase().includes(userState.toLowerCase())
  );

  function getCount(lganame) {
    let ags = agentsList.data.filter((ag) => ag.lga == lganame);
    return ags.length;
  }
  const [activeIndex, setActiveIndex] = useState(0);

  function setTabActive(position) {
    setActiveIndex(position);
  }
  const tabTitles = [
    "All States",
    "State Rep",
    "Local Government",
    "Wards",
    "Agents",
  ];
  return (
    <div className="dasboard_new">
      <Head>
        <title>{userState} | ADMIN</title>
      </Head>
      <div className="spacer"></div>
      <div className="tabSection">
        <nav>
          {tabTitles.map((title, index) => {
            return (
              <label
                className={activeIndex == index ? " active" : ""}
                onClick={() => setTabActive(index)}
              >
                {title}
              </label>
            );
          })}
        </nav>
        <hr />
      </div>
      <section className="contentSection">
        <div className={activeIndex == 0 ? "showWidget" : "hideWidget"}>
          <StateList />
        </div>
        <div className={activeIndex == 1 ? "showWidget" : "hideWidget"}>
          <LgaList state="BAUCHI" />
        </div>
        <div className={activeIndex == 2 ? "showWidget" : "hideWidget"}>
          <WardList state="ADAMAWA" />
        </div>
        <div className={activeIndex == 3 ? "showWidget" : "hideWidget"}>
          <LgaList state="DELTA" />
        </div>

        <div className={activeIndex == 4 ? "showWidget" : "hideWidget"}>
          <LgaList state="DELTA" />
        </div>
      </section>
    </div>
  );
}
