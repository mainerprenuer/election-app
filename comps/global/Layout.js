import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";
// import Sidebar from "./sidebar";
// import BecomeAgentBtn from "../BecomeAgentBtn";
// import HelpBtn from "../HelpBtn";

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>APCAIMS </title>
        <meta name="APCAIMS" content="Created by Eligbue" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Navbar />
      {/* <Sidebar /> */}
      {/* <HelpBtn /> */}
      {props.children}
      <Footer />
    </>
  );
}
