import React from "react";
import { AiFillGithub } from "react-icons/ai";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div>
          <a className="link" href="/">
            Home
          </a>
        </div>
        <div>
          <a className="link" href="/guide">
            Help
          </a>
        </div>
        <div>
          <a className="link" href="/faq">
            FAQ
          </a>
        </div>
        <div>
          <a className="link" href="/faq_admin">
            FAQ ADMIN
          </a>
        </div>
      </div>

      <div className="copyright">
        <p>2022 Copyright &copy;</p>
      </div>
      <div className="copyright">
        <p>
          {/* <a href="http://www.hexelan.co/">Powered by Hexelan</a> */}
          Powered by Hexelan
        </p>
      </div>
    </div>
  );
}
