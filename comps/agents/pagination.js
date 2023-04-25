import React from "react";
import { pagination, ul } from "./../../styles/paginate.module.scss";

export default function Pagination({ agentsPerPage, totalAgents, paginate }) {
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAgents / agentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={pagination}>
      <ul className={ul}>
        {pageNumbers.map((numm, index) => {
          return (
            <li key={index}>
              <a onClick={() => paginate(numm)} className="" href="">
                {numm}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
