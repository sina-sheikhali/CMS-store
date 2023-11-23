import React from "react";
import { GoArrowUpLeft } from "react-icons/go";
import { GoArrowDownLeft } from "react-icons/go";

export default function sdasdasd({ Amount, percent, title, IsAsc }) {
  return (
    <section>
      <div className="bg-grayColor text-white py-6 px-3  flex flex-col gap-y-2 rounded-md ">
        <div className="flex items-center justify-between gap-x-5">
          <div className="flex items-center">
            <h3 className="text-xl font-bold">{Amount}</h3>
            <span className="text-xs text-lightGray">تومان</span>
            <span
              className={`${
                IsAsc ? "text-greenColor" : "text-redColor"
              } text-sm mr-2`}
            >
              {percent}
            </span>
          </div>
          <div
            className={`${
              IsAsc
                ? "bg-[#16302A] text-greenColor"
                : "bg-[#322028] text-redColor"
            }  p-3 rounded-lg `}
          >
            {IsAsc ? <GoArrowUpLeft /> : <GoArrowDownLeft />}
          </div>
        </div>
        <h6 className="text-lightGray">{title}</h6>
      </div>
    </section>
  );
}
