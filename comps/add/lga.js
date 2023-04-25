import React, { useState } from "react";
import { data } from "../../constants/states/index";
import {
  stateList,
  errorDiv,
  loadingDiv,
  listItem,
} from "../../styles/statelist.module.scss";
import { useQuery } from "@apollo/client";
import GET_ALL_STATES from "../../graphql/getstates.hook";

export default function AddLgaList() {
  const { error, loading, data } = useQuery(GET_ALL_STATES);
  if (error)
    return <div className={errorDiv}>Oops... Something went wrong</div>;
  if (loading) return <div className={loadingDiv}>Loading....</div>;

  if (data) {
    return (
      <div className={stateList}>
        <h3>All States {data.getAllStates.length}</h3>
        {data.getAllStates.map(({ name, capital }, index) => (
          <div key={index} className={listItem}>
            <h4>
              {index + 1}. {name}
              <h5>{capital}</h5>
            </h4>
          </div>
        ))}
      </div>
    );
  }
}
