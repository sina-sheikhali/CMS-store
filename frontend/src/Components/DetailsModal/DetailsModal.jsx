import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export default function DetailsModal({ onClose, children }) {
  useEffect(() => {
    const checkKey = (event) => {
      if (event.keyCode == 27) {
        onClose();
      }
    };

    window.addEventListener("keydown", checkKey);

    return () => window.removeEventListener("keydown", checkKey);
  });
  return ReactDOM.createPortal(
    <div className="fixed bg-bgModal top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-screen flex items-center justify-center z-20 transition-opacity">
      <div className="bg-white p-10 rounded-sm flex flex-col gap-y-5 ">
        {children}
      </div>
    </div>,
    document.getElementById("modals-parent")
  );
}
