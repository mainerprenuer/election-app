import Link from "next/link";
import React from "react";
import { MdOutlineHelp } from "react-icons/md";

export default function HelpBtn() {
  return (
    <div className="HelpBtn">
      <a href="/guide">
        <MdOutlineHelp />
      </a>
    </div>
  );
}
