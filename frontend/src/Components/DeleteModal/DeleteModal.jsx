import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { IoIosClose } from "react-icons/io";
export default function DeleteModal({ submitAction, cancelAction, title }) {
  useEffect(() => {
    const checkKey = (event) => {
      if (event.keyCode === 27) {
        cancelAction();
      }
    };

    window.addEventListener("keydown", checkKey);

    return () => window.removeEventListener("keydown", checkKey);
  });
  return ReactDOM.createPortal(
    <div className="fixed bg-bgModal top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-screen flex items-center justify-center z-20 transition-opacity">
      <div className="bg-white p-10  rounded-sm flex flex-col gap-y-8 mx-2 relative">
        <div className="flex justify-between items-start absolute top-0 right-0 w-full">
          <button className="text-xl bg-red-500" onClick={() => cancelAction()}>
            <IoIosClose className="text-white" />
          </button>

          <span className="hidden md:block bg-blueColor text-white tracking-widest  text-sm rounded-sm px-0.5">
            ESC
          </span>
        </div>
        <h1 className="font-bold text-lg md:text-2xl mt-5">{title}</h1>
        <div className="flex items-center justify-center gap-5 ">
          <button
            className="py-3 px-10 text-xl rounded-md text-white bg-redColor hover:opacity-70 transition-opacity"
            onClick={() => cancelAction()}
          >
            خیر
          </button>
          <button
            className="py-3 px-10 text-xl rounded-md text-white bg-greenColor hover:opacity-70 transition-opacity"
            onClick={() => submitAction()}
          >
            بله
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modals-parent")
  );
}
