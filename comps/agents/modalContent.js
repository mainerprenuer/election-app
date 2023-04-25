import React from "react";

export default function AgentModalContent({ agent }) {
  return (
    <div className="agentModal">
      <div>
        <p>
          <strong> Name:</strong> {agent.name} {agent.firstName}
          {agent.lastName}
        </p>
        <hr />
        <p>
          <strong> Email:</strong> {agent.email}
        </p>
        <hr />
        <p>
          <strong> Phone:</strong> {agent.phone}
        </p>
        <hr />
        <p>
          <strong> Address:</strong> {agent.address}
        </p>
        <hr />
        <p>
          <strong> State:</strong> {agent.state}
        </p>
        <hr />
        <p>
          <strong> Local Government:</strong> {agent.lga}
        </p>
        <hr />
        <p>
          <strong> Ward:</strong> {agent.ward}
        </p>
        <hr />
        <p>
          <strong> Agent Type:</strong> {agent.agentType}
        </p>
        <hr />
        <p>
          <strong> Election Type:</strong> {agent.electionType}
        </p>
        <hr />
        <p>
          <strong> Polling Unit:</strong> {agent.pollingUnit}
        </p>
      </div>
    </div>
  );
}
