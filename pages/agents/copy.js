import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import LoadingIndicator from "../../comps/global/LoadingIndicator";

export default function MembersPage({ memberProfile }) {
  const router = useRouter();
  const { id } = router.query;
  const [userProfile, setUserProfile] = useState({});
  console.log(memberProfile);
  useEffect(() => {
    axios
      .get(`https://rxedu-api.vercel.app/api/v1/member/${id}`)
      .then((response) => {
        setUserProfile(response.data.doc);
        console.log("Working");
        // console.log(response.data.doc);
        // console.log(`Length: ${response}`);
      })
      .catch(() => {
        console.log("Opps an error ocured - Local");
      });
  }, {});

  return (
    <div className="profilePage">
      <Head>
        <title>APCMIMS | Profile</title>
      </Head>
      <br />
      {memberProfile ? (
        <div className="preview">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Info</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Photo</td>
                <td>
                  <img src={userProfile.image} alt="Profile Photo" />
                </td>
              </tr>
              <tr>
                <td>First Name</td>
                <td>
                  {userProfile.firstName} {userProfile.name}
                </td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{userProfile.lastName}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{userProfile.email}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{userProfile.phone}</td>
              </tr>
              <tr>
                <td>Alt Phone</td>
                <td>{userProfile.alternatePhone}</td>
              </tr>
              <tr>
                <td>Date of Birth</td>
                <td>{userProfile.dateOfBirth}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{userProfile.address}</td>
              </tr>
              <tr>
                <td>State</td>
                <td>{userProfile.state}</td>
              </tr>
              <tr>
                <td>LGA</td>
                <td>{userProfile.lga}</td>
              </tr>
              <tr>
                <td>Ward</td>
                <td>{userProfile.ward}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <LoadingIndicator />
      )}
      <div className="btn">Print Membership Card</div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const art = await axios.get(
    `https://rxedu-api.vercel.app/api/v1/agents/${query.id}`
  );
  return {
    props: {
      // memberProfile: art.data.data,
      memberProfile: art.data.doc,
    },
  };
}
