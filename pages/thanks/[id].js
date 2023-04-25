import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function Congratulations({ content }) {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <div className="thanksWrapper">
      <div className="content">
        <h1>Congratulations! </h1>
        <h3>You are now an agent.</h3>
        <Link passHref href={`/agents/${id}`}>
          <div className="btn">Download Profile</div>
        </Link>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const { query } = context;
//   const art = await axios.get(
//     `https://rxedu-api.vercel.app/api/v1/agent_by_nin/${query.nin}`
//   );
//   return {
//     props: {
//       // memberProfile: art.data.data,
//       memberProfile: art.data.doc,
//     },
//   };
// }
