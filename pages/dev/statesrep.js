import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { data } from "../../constants/states";

export default function Statesrep() {
  // const router = useRouter();

  return (
    <div className=" devStateRep">
      <h2>States Representatives Details</h2>
      <div className="tableSection">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone</th>
              <th>State Code</th>
              <th>User Type</th>
            </tr>
          </thead>
          <tbody>
            {data.sr.map((agent, index) => (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{agent.name}</td>
                <td>{agent.email}</td>
                <td>{agent.password}</td>
                <td>{agent.phone}</td>
                <td>{agent.statecode}</td>
                <td>{agent.userType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
