import React from "react";
import {
  deletePopup,
  buttons,
  proceedBtn,
  cancelBtn,
} from "../../styles/deletepopup.module.scss";

export default function DeletePopup({ heading, msg, proceedFunc, cancelFunc }) {
  return (
    <div className={deletePopup}>
      <h3>{heading}</h3>
      <p>{msg}</p>
      <div className={buttons}>
        <a
          className={proceedBtn}
          onClick={() => {
            proceedFunc();
          }}
        >
          Yes
        </a>
        <a
          className={cancelBtn}
          onClick={() => {
            cancelFunc();
          }}
        >
          No
        </a>
      </div>
    </div>
  );
}
