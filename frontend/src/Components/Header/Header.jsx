import React from "react";
import { HiMiniBars3 } from "react-icons/hi2";
import { HiViewGrid } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";

export default function Header({ isOpen, setIsOpen }) {
  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0  ${
          isOpen ? "lg:right-[70px]" : "lg:right-[243px]"
        } z-10 flex items-center  bg-grayColor transition-all duration-300`}
      >
        <div className="text-white px-4  h-[70px] flex items-stretch gap-x-5 w-full">
          <button
            className="text-lg lg:text-sm text-lightGray cursor-pointer"
            onClick={() => setIsOpen((value) => !value)}
          >
            <HiMiniBars3 />
          </button>
          <div className="flex lg:hidden items-center">
            <a href="#" className="">
              <img
                src="https://technext.github.io/corona-free-dark-bootstrap-admin-template/assets/images/logo.svg"
                alt="logo"
                className="w-[100px] object-cover"
              />
            </a>
          </div>
          <ul className="hidden lg:flex items-center w-2/3">
            <li className="w-1/2">
              <form action="" className="mx-1 whitespace-nowrap">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-grayColor py-[11px] px-5 border border-solid border-[#2c2e33] w-full rounded-md h-[2.25rem] focus-within:text-[#495057] transition-colors
                placeholder:text-lightGray placeholder:text-sm"
                />
              </form>
            </li>
          </ul>
          <ul className="flex items-center mr-auto ">
            <li className="hidden lg:block text-white whitespace-nowrap mx-1">
              <a href="#" className="block py-2 px-4 text-lg">
                <HiViewGrid />
              </a>
            </li>
            <li className="text-white whitespace-nowrap mx-1 border-x border-solid border-[#2C2E33]">
              <a href="#" className="block py-2 px-4 text-lg relative">
                <MdEmail />
                <span className="absolute right-4 top-2 w-2 h-2 rounded-full leading-6 border border-solid border-[#2c2e33] bg-greenColor"></span>
              </a>
            </li>
            <li className="text-white whitespace-nowrap mx-1">
              <a href="#" className="block py-2 px-4  relative">
                <FaBell />
                <span className="absolute right-4 top-2 w-2 h-2 rounded-full leading-6 border border-solid border-[#2c2e33] bg-redColor"></span>
              </a>
            </li>
            <li className="hidden sm:flex  py-1 relative  min-w-[150px]">
              <a href="#" className="flex w-full">
                <div className="flex items-center justify-center w-full ">
                  <img
                    src="/img/profile1.jpg"
                    alt="profile"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <span className="text-sm block whitespace-nowrap mr-4">
                    علی قربانی
                  </span>
                  <FaSortDown className="text-[#a7afb7]   block pb-1" />
                </div>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
