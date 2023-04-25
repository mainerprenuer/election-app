import React, { useState } from "react";
import {
  stateList,
  errorDiv,
  loadingDiv,
  listItem,
} from "../../styles/statelist.module.scss";
import useAllStates from "../../graphql/getstates.hook";

export default function StateList() {
  const { error, loading, data } = useAllStates();

  if (error)
    return <div className={errorDiv}>Oops... Something went wrong</div>;
  if (loading) return <div className={loadingDiv}>Loading....</div>;

  const [selectedState, setSelectedState] = useState("");

  if (data) {
    return (
      <div className={stateList}>
        <h3>All States {data.getAllStates.length}</h3>
        {data.getAllStates.map(({ name, capital }, index) => (
          <div key={index} className={listItem}>
            <h4>
              {index + 1}. {name} <span>{capital}</span>
            </h4>
            <div onClick={() => setSelectedState(name)}>
              <h3>Stop coming out</h3>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
