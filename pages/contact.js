import React, { useRef } from "react";
import { emailjs } from "@emailjs/browser";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "replace with service id",
        "replace with template id",
        form.current,
        "replace with user id"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="section">
      <form ref={form} onSubmit={sendEmail} className="form">
        <div className="input_box">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            type="text"
            required
            minLength={5}
            id="name"
            placeholder="Enter your name"
            name="name"
          />
        </div>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
