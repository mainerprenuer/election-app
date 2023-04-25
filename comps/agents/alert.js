import React from "react";

const AlertSuccessful = () => {
  return (
    <div class="alert success">
      <span class="closebtn" onclick="this.parentElement.style.display='none';">
        &times;
      </span>
      <strong>Success!</strong> Agent was successfully added
    </div>
  );
};
const AlertDeleted = () => {
  return (
    <div class="alert deleted">
      <span class="closebtn" onclick="this.parentElement.style.display='none';">
        &times;
      </span>
      <strong>Success!</strong> Agent was successfully added
    </div>
  );
};

export { AlertSuccessful, AlertDeleted };
// export declare const FcUp: IconType;
// export declare  const AlertSuccessful;
