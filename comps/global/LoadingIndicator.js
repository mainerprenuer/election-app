import React from "react";
import { motion } from "framer-motion";
import { Circles } from "react-loader-spinner";

export default function LoadingIndicator() {
  return (
    <motion.div
      className="sect"
      // className={`sect step2 ${4 === 4 ? styleShow : styleHide}`}
      initial={{ x: "-100vw", opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.7, delay: 1, type: "tween" }}
    >
      <form className="form ">
        <h2>Loafing...</h2>
        <div className="loader">
          <Circles
            height="200"
            width="200"
            color="#1663b0"
            ariaLabel="circles-loading"
            visible={true}
          />
        </div>
      </form>
    </motion.div>
  );
}
