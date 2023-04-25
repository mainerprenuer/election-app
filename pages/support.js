import React, { useRef, useState } from "react";
import { emailjs, sendForm } from "@emailjs/browser";
import { Landing } from "../comps/global/Landing";
import { motion } from "framer-motion";
import { Modal } from "../comps/global/Modal";
import { CircleLoader } from "react-spinners";
import Modal2 from "../comps/global/Modal2";

export default function Contact() {
  const form = useRef();

  const [isSuccessful, setIsSuccessful] = useState(true);
  const [formParams, setFormParams] = useState({
    name: "",
    email: "",
    title: "",
    comment: "",
  });
  const sendEmail = (e) => {
    e.preventDefault();

    sendForm(
      "service_qvozhje",
      "template_bty5knr",
      form.current,
      "VRrx2rJ9jrvmjhAzY"
    ).then(
      (result) => {
        console.log(result.text);
        console.log("message sent");
        setIsSuccessful(true);
        // formParams.title = "";
        // formParams.comment = "";
        // setFormParams({ title: "", comment: "" });
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormParams({ ...formParams, [name]: value });
  };
  return (
    <>
      <Landing
        title="Contact us"
        imgUrl="images/contact.jpg"
        subtitle="We run a 247 customer care technical support services."
      />

      <div className="section formsPage contactUs">
        <motion.div
          className="sect "
          initial={{ x: "-100vw", opacity: 0.1 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.3, delay: 0.5, type: "tween" }}
        >
          <form
            className="form"
            method="post"
            type="text/plain"
            ref={form}
            onSubmit={sendEmail}
          >
            <h2>Email Us</h2>

            <div className="input_box">
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="text"
                required
                id="name"
                placeholder="Enter your name"
                name="name"
                value={formParams.name}
                onChange={onChange}
              />
            </div>
            <div className="input_box">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="text"
                required
                minLength={5}
                id="email"
                onChange={onChange}
                value={formParams.email}
                placeholder="Enter your email"
                name="email"
              />
            </div>
            <div className="input_box">
              <label htmlFor="email" className="label">
                Title
              </label>
              <input
                type="text"
                required
                minLength={5}
                value={formParams.title}
                onChange={onChange}
                id="title"
                placeholder="Subject of mail"
                name="title"
              />
            </div>
            <div className="input_box">
              <label htmlFor="form-comment" className="label">
                Comment
              </label>
              <textarea
                type="text"
                required
                id="form-comment"
                value={formParams.comment}
                onChange={onChange}
                placeholder="Write your comment..."
                name="comment"
                rows="10"
              ></textarea>
            </div>
            <div className="btnContainer">
              <div className=" buttons">
                <input
                  type="submit"
                  value="Send"
                  // onClick={handlePrev}
                  className="btn"
                />
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
