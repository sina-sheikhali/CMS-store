import React from "react";
import ReactDOM from "react-dom";
export default function DeleteModal({ submitAction, cancelAction, title }) {
  return ReactDOM.createPortal(
    <div className="fixed bg-bgModal top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-screen flex items-center justify-center z-20 transition-opacity">
      <div className="bg-white p-10 rounded-sm flex flex-col gap-y-8 ">
        <h1 className="font-bold text-2xl">{title}</h1>
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
