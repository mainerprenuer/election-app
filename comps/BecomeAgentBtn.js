import { useRouter } from "next/router";
import React from "react";
import { HiUserGroup } from "react-icons/hi";

const BecomeAgentBtn = () => {
  const router = useRouter();

  return (
    <div className="BecomeAgentBtn" onClick={() => router.push("/agents/add")}>
      <a>Become an agent</a>
      {/* <a>
        <HiUserGroup />
      </a> */}
    </div>
  );
};

export default BecomeAgentBtn;
