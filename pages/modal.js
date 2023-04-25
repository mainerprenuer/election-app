import React, { useState } from "react";

export default function Modal() {
  const [open, setopen] = useState(false);
  const [close, setclose] = useState(false);
  return (
    <div className="section">
      <div>WIllo</div>
      <div style={OVERLAY_STYLES} />
      {open && (
        <div style={MODAL_STYLES}>
          Modal Content
          <div className="btn" onClick={() => setopen(!open)}>
            Close
          </div>
        </div>
      )}
      <div className="btn" onClick={() => setopen(!open)}>
        Toggle
      </div>
      <div className="btn">close</div>
    </div>
  );
}

const MODAL_STYLES = {
  position: `fixed`,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, 50%",
  backgroundColor: "#fff",
  padding: "50px",
  zIndex: "1000",
};

const OVERLAY_STYLES = {
  position: `fixed`,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: "1000",
};
