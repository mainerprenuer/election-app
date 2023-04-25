import React from "react";
import { notification } from "../styles/notification.module.scss";

export default function NotificationPopup({ heading, msg, bar }) {
  return (
    <div className={notification}>
      <h3>{heading}</h3>
      <p>{msg}</p>
      <div className={bar}></div>
    </div>
  );
}
