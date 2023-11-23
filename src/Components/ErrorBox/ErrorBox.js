import React from "react";

export default function ErrorBox({ msg }) {
  return (
    <div className="bg-redColor text-white flex items-center justify-center p-5 rounded-lg mx-5">
      <h1 className="font-bold text-xl">{msg}</h1>
    </div>
  );
}
