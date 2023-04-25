import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { RiHome5Fill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { FaRegRegistered, FaQuestion } from "react-icons/fa";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import Link from "next/link";
import {
  MdMyLocation,
  MdGroups,
  MdAdminPanelSettings,
  MdOutlineEmail,
  MdOutlineHelp,
  MdContactMail,
  MdSpaceDashboard,
} from "react-icons/md";

export default function Sidebar() {
  const router = useRouter();
  const _path = router.pathname;
  const [user, setUser] = useState({
    name: "",
    userType: "",
    email: "",
    stateCode: "",
    password: "",
    phone: "",
  });
  // console.log("router.pathname");
  useEffect(() => {
    if (fetchUser()) {
      setUser(fetchUser());
    } else {
      setUser(null);
    }
  }, []);

  function fetchUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  const logOut = () => {
    localStorage.clear();
    setUser({});
    router.reload(window.location.pathname);
    // router.push("/");
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar_start">
          {/* <img className="logo" src="/images/logo.png" /> */}
          <img className="logo" src="/images/logo.png" width={45} height={45} />
          <label className="brand">APCAIMS</label>
          <ul className="sidebar_start_list">
            <a className="link" href="/">
              <li
                className={
                  _path == "/" ? "activeItem" : "sidebar_start_list_item"
                }
              >
                <span>
                  <RiHome5Fill />
                </span>
                Home
              </li>
            </a>
            {!user && (
              <a className="link" href="/agents/add">
                {/* <a className="link" href="/noreg"> */}
                <li
                  className={
                    // _path == "/agents/add"
                    _path == "/noreg" ? "activeItem" : "sidebar_start_list_item"
                  }
                >
                  <span>
                    <FaRegRegistered />
                  </span>
                  Add Agent
                </li>
              </a>
            )}

            <a className="link" href="/sponsor">
              <li
                className={
                  _path == "/sponsor" ? "activeItem" : "sidebar_start_list_item"
                }
              >
                <span>
                  <MdMyLocation />
                </span>
                Sponsor
              </li>
            </a>

            {/* <a className="link" href="/lga">
              <li
                className={
                  _path == "/lga" ? "activeItem" : "sidebar_start_list_item"
                }
              >
                <span>
                  <MdMyLocation />
                </span>
                LGAs
              </li>
            </a> */}

            {/* {user && (
              <a className="link" href={`/state/${user.name}`}>
                <li
                  className={
                    _path == `/state/${user.name}`
                      ? "activeItem"
                      : "sidebar_start_list_item"
                  }
                >
                  <span>
                    <MdGroups />
                  </span>
                  AGENTS
                </li>
              </a>
            )} */}

            {/* {user.userType == "ADMIN" ? (
              <a className="link" href="/admin">
                <li
                  className={
                    _path == "/admin" ? "activeItem" : "sidebar_start_list_item"
                  }
                >
                  <span>
                    <MdAdminPanelSettings />
                  </span>
                  ADMIN
                </li>
              </a>
            ) : (
              <a className="link" href={`/dashboard/${user.name}`}>
                <li
                  className={
                    _path == "/dashboard"
                      ? "activeItem"
                      : "sidebar_start_list_item"
                  }
                >
                  <span>
                    <MdSpaceDashboard />
                  </span>
                  {user.name}
                </li>
              </a>
            )} */}
            {user && (
              <a className="link" href={`/dashboard/${user.name}`}>
                <li
                  className={
                    _path == "/dashboard"
                      ? "activeItem"
                      : "sidebar_start_list_item"
                  }
                >
                  <span>
                    <MdSpaceDashboard />
                  </span>
                  {user.name}
                </li>
              </a>
            )}
            {user ? (
              <a className="link" href="/login" onClick={logOut}>
                <li className={"sidebar_start_list_item"}>
                  <span>
                    <BiLogOut />
                  </span>
                  Logout
                </li>
              </a>
            ) : (
              <a className="link" href="/login">
                <li
                  className={
                    _path == "/login" ? "activeItem" : "sidebar_start_list_item"
                  }
                >
                  <span>
                    <BiLogIn />
                  </span>
                  Login
                </li>
              </a>
            )}

            <a className="link" href="/support">
              <li
                className={
                  _path == "/support" ? "activeItem" : "sidebar_start_list_item"
                }
              >
                <span>
                  <MdContactMail />
                </span>
                Contact Us
              </li>
            </a>
            {!user && (
              <a className="link" href="/faq">
                <li
                  className={
                    _path == "/faq" ? "activeItem" : "sidebar_start_list_item"
                  }
                >
                  <span>
                    <FaQuestion />
                  </span>
                  FAQ
                </li>
              </a>
            )}
            {user && (
              <a className="link" href="/faq_admin">
                <li
                  className={
                    _path == "/faq_admin"
                      ? "activeItem"
                      : "sidebar_start_list_item"
                  }
                >
                  <span>
                    <FaQuestion />
                  </span>
                  FAQ Admin
                </li>
              </a>
            )}
            <a className="link" href="/guide">
              <li
                className={
                  _path == "/guide" ? "activeItem" : "sidebar_start_list_item"
                }
              >
                <span>
                  <MdOutlineHelp />
                </span>
                Help
              </li>
            </a>
          </ul>
        </div>
      </div>
    </>
  );
}
