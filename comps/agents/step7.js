import React from "react";
import { motion } from "framer-motion";
import { Circles } from "react-loader-spinner";

export default function Form6({
  agent,
  stepIndex,
  agentParams,
  handleChange,
  handlePrev,
  handleSubmit,
  onLoading,
}) {
  const styleHide = "hide";
  const styleShow = "show";
  return (
    <motion.div
      className={`sect step6 ${stepIndex === 6 ? styleShow : styleHide}`}
      // className={`sect step2 ${4 === 4 ? styleShow : styleHide}`}
      initial={{ x: "-100vw", opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.7, delay: 1, type: "tween" }}
    >
      <form className="form ">
        <h2>
          Saving...
          {/* <span>Uploading image and saving data</span> */}
        </h2>
        <div className="loader">
          <Circles
            height="200"
            width="200"
            color="#1663b0"
            ariaLabel="circles-loading"
            // wrapperStyle={{}}
            // wrapperClass=""
            visible={true}
          />
        </div>
      </form>
    </motion.div>
  );
}
