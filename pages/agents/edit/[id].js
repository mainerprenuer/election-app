import React from "react";
import EditAgentComp from "../../../comps/edit_agent";
import axios from "axios";

export default function EditAgent({ agentInfo }) {
  return <EditAgentComp agentInfo={agentInfo} />;
}

export async function getServerSideProps(context) {
  const { query } = context;
  const art = await axios.get(
    `https://rxedu-api.vercel.app/api/v1/agent/${query.id}`
  );
  return {
    props: {
      // memberProfile: art.data.data,
      agentInfo: art.data.doc,
    },
  };
}
