import React from "react";
import ReactDOM from "react-dom";
import { ImSpinner9 } from "react-icons/im";
export default function Loader() {
  return ReactDOM.createPortal(
    <>
      <div className="fixed  bg-[rgba(0,0,0,0.7)] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-screen flex items-center justify-center z-20 transition-opacity">
        <ImSpinner9 className="text-white w-10 h-10 md:w-14 md:h-14 animate-spin" />
      </div>
    </>,
    document.getElementById("modals-parent")
  );
}
