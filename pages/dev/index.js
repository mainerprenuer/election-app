import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    statecode: "",
    img: "",
    userType: "",
  });

  useEffect(() => {
    if (!fetchUser()) {
      router.push("/");
      console.log(fetchUser());
    } else {
      setUser(fetchUser());
      // if (user.userType !== "DEV") {
      //   router.push("/");
      //   console.log("Not a Dev");
      //   alert("Sorry you are not a dev!");
      // }
    }
  }, []);

  function fetchUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  return (
    <div className="dasboardWrapper">
      <Head>
        <title>APCAIMS | ADMIN</title>
      </Head>
      <div className="dashboard">
        <div className="card">
          <div className="topbar orange"></div>
          <div className="content">
            <h3>All States Rep</h3>
          </div>
        </div>
        <div className="card">
          <div className="topbar green"></div>
          <div className="content">
            <h3>GUBANATORIAL</h3>
            <p>76 Agents</p>
          </div>
        </div>
        <div className="card">
          <div className="topbar teal"></div>
          <div className="content">
            <h3>SENATORIAL</h3>
            <p>89 Agents</p>
          </div>
        </div>

        <Link href="/dev/statesrep">
          <a className="card">
            <div className="bgAgent">
              <div className="content">
                <h3>States Rep</h3>
                <p>State Representatives</p>
              </div>
            </div>
          </a>
        </Link>
        <Link href="/agents">
          <a className="card">
            <div className="bgAgent">
              <div className="content">
                <h3>Agents</h3>
                <p>All Agents from the various states.</p>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
