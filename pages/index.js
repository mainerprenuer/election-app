import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { H1 } from "../_styles/H1";
import { Landing } from "../comps/global/Landing";
import {
  home,
  gridContainer,
  card,
  img,
  description,
} from "../styles/home.module.scss";

const listic = [
  {
    id: "e3",
    title: "Manage Agents",
    image: "/images/bg.jpg",
    desc: "View the status of all your agents accross the various wards and polling unit.",
  },
  {
    id: "33",
    title: "Analytics",
    image: "/images/lac.jpg",
    desc: "Helping you make better and informed decision.",
  },
  {
    title: "Have all your agents data in one place",
    image: "/images/organise.jpg",
    id: "r3",
    desc: "Always stay organised",
  },
];
export default function Home() {
  const [agentList, setAgentList] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [agentMsg, setAgentMsg] = useState("Search for an agent");

  const handleSubmit = async (e) => {
    console.log("Submitted");
    console.log(searchValue);
    if (searchValue) {
      axios
        .get(
          `https://rxedu-api.vercel.app/api/v1/agent_by_nin?nin=${searchValue.searchTerm}`
        )
        .then((response) => {
          setAgentList(response.data.data);
          console.log("Working");
          console.log(response.data.data);
          if (response.data.data.length > 0) {
            setAgentMsg("Agents");
          }
          console.log(response);
        })
        .catch(() => {
          setAgentMsg("Sorry, no Agent found");
          console.log("Opps an error ocured - Local");
        });
    } else {
      console.log("No Value");
    }
  };

  const handleChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearchValue({ ...searchValue, [name]: value });
    console.log(searchValue);
  };

  return (
    <div className={home}>
      <Landing
        title="APCAIMS"
        imgUrl="images/bg.jpg"
        subtitle="APC Agents Manager "
        opacity={0.55}
      />
      <div className="section ">
        {/* <H1 title="Registration ends on the 31st of December, 2022." /> */}
        <Link href="/verify">
          <div className="btn">Print your form</div>
        </Link>
      </div>

      <div className={gridContainer}>
        {listic.map(({ title, image, id, desc }) => (
          <div key={id} className={card}>
            <img className={img} src={image} />
            <div className={description}>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
