import React, { useState, useEffect } from "react";
// import LGAs from "../../comps/lga";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import deleteAgent from "../../../functions/deleteagent";
import NotificationPopup from "../../../comps/notification";
import DeletePopup from "../../../comps/agents/deletePopup";

export default function LGAPage({ info, agentsList }) {
  const router = useRouter();
  const [showDeleteDialog, setDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [agentIDToDelete, setAgentIDToDelete] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [clickedAgent, setClickedAgent] = useState({});

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
    } else {
      setUser(fetchUser());
    }
  }, []);

  function fetchUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  const proceedFunc = () => {
    setDeleteDialog(false);
    onDelete(agentIDToDelete);
  };
  const cancelFunc = () => {
    setDeleteDialog(false);
  };

  const onDelete = (agentID) => {
    setDeleting(true);
    axios
      .delete(`https://rxedu-api.vercel.app/api/v1/agent/${agentID}`)
      // axios
      //   .patch(`https://rxedu-api.vercel.app/api/v1/agent/${agentID}`, {
      //     isRemoved: true,
      //   })
      .then((response) => {
        setIsSuccessful(true);
        router.reload(window.location.pathname);
        setTimeout(() => {
          setIsSuccessful(false);
          setDeleting(false);
        }, 3000);
      })
      .catch((e) => {
        console.log(e);
        console.log("Opps an error ocured");
      });
  };
  return (
    <div className="lgaWrapper">
      <div className="comp">
        <Head>
          <title>APCAIMS | {info.lga} | INFO</title>
        </Head>
        <div className="section">
          <h4>State | LGA | Ward</h4>
          <h2>
            {info.state} | {info.lga} | {info.ward}
          </h2>
          <div className="agentslist">
            <div className="tableSection">
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Agent Type</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {agentsList.data.map((agent, index) => {
                    const namer = `${agent.lastName} ${agent.firstName}`;
                    return (
                      <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{namer.toUpperCase()}</td>
                        <td>{agent.agentType}</td>
                        <td>
                          <Link href={`/agents/edit/${agent._id}`}>
                            <a>
                              <FaUserEdit className="icon" />
                            </a>
                          </Link>
                        </td>
                        <td>
                          <AiFillDelete
                            className="icon delete"
                            onClick={() => {
                              setDeleteDialog(true);
                              setAgentIDToDelete(agent._id);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {deleting && (
        <NotificationPopup
          heading="Deleting..."
          msg="This agent is being deleted"
        />
      )}
      {showDeleteDialog && (
        <DeletePopup
          heading="Oopx.. "
          msg="Cannot Delete Info"
          proceedFunc={() => {}}
          cancelFunc={cancelFunc}
        />
      )}
      {/* {showDeleteDialog && (
        <DeletePopup
          heading="Do you want to delete this agent?"
          msg="Click yes to continue."
          proceedFunc={proceedFunc}
          cancelFunc={cancelFunc}
        />
      )} */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  let ll = query.params.split("~");
  console.log(query.params);
  console.log(ll);
  const info = {
    state: ll[0],
    lga: ll[1],
    ward: ll[2],
  };
  // try {
  let art;
  art = await axios(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/ward_agents?state=${info.state}&lga=${info.lga}&ward=${info.ward}`
  );

  return {
    props: {
      agentsList: art.data,
      info,
    },
  };
}
