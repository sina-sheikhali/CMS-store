import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { IoIosClose } from "react-icons/io";
export default function DetailsModal({ onClose, children }) {
  useEffect(() => {
    const checkKey = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    window.addEventListener("keydown", checkKey);

    return () => window.removeEventListener("keydown", checkKey);
  });
  return ReactDOM.createPortal(
    <div className="fixed bg-bgModal top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-screen flex items-center justify-center z-20 transition-opacity">
      <div className="bg-white p-10 rounded-sm flex flex-col gap-y-5 mx-2 relative overflow-x-scroll md:overflow-hidden">
        <div className="flex justify-between items-start absolute top-0 right-0 w-full">
          <button className="text-xl bg-red-500" onClick={() => onClose()}>
            <IoIosClose className="text-white" />
          </button>

          <span className="hidden md:block bg-blueColor text-white tracking-widest  text-sm rounded-sm px-0.5">
            ESC
          </span>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modals-parent")
  );
}
