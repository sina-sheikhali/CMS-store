import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { IoIosClose } from "react-icons/io";
export default function EditModal({ children, onSubmit, onClose }) {
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
      <form className="bg-grayColor p-10 rounded-sm flex flex-col gap-y-5 w-5/6 md:w-1/2 lg:1/3  max-h-[90%] overflow-y-auto relative">
        <div className="flex justify-between items-start absolute top-0 right-0 w-full">
          <button className="text-xl bg-red-500" onClick={() => onClose()}>
            <IoIosClose className="text-white" />
          </button>

          <span className="hidden md:block bg-blueColor text-white tracking-widest  text-sm rounded-sm px-0.5">
            ESC
          </span>
        </div>
        <h1 className="text-xl font-bold text-white">
          اطلاعات جدید را وارد کنید
        </h1>
        {children}
        <button
          className="py-1  w-full bg-greenColor rounded-md text-white hover:bg-[#00d25bcc] text-xl transition-colors"
          onClick={onSubmit}
        >
          ثبت
        </button>
      </form>
    </div>,
    document.getElementById("modals-parent")
  );
}
