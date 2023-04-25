import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { AiFillEye } from "react-icons/ai";

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
    <div className="verifyPage">
      <div className="section ">
        <div className="form">
          <div className="input_box">
            <input
              type="text"
              id="form-email"
              placeholder=" Enter your NIN to verify"
              name="searchTerm"
              onChange={handleChange}
            />
          </div>
          <div className="buttons">
            <input
              type="submit"
              value="Search"
              onClick={handleSubmit}
              className="btn"
            />
          </div>
        </div>
        {agentList.map((gh, index) => {
          const namer = `${gh.lastName} ${gh.firstName}`;
          return (
            <div className="agentCard" key={index}>
              {/* <Image src={gh.image} height={50} width={50} /> */}
              <div className="content">
                <img
                  src={gh.image}
                  width={100}
                  height={100}
                  alt="profile image"
                />
                <div className="text">
                  <h3>{namer.toUpperCase()}</h3>
                  <h5>{gh.email}</h5>
                </div>
              </div>
              <Link passHref href={`/agents/${gh._id}`} className="link">
                <div className="iconButton">
                  <AiFillEye size={25} />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
