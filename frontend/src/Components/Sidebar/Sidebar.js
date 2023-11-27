import React from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSpeedometerOutline } from "react-icons/io5";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { BiSolidCommentDetail } from "react-icons/bi";
import { BiSolidDiscount } from "react-icons/bi";

export default function Sidebar() {
  return (
    <nav className="fixed top-0 h-full overflow-auto bg-grayColor w-[244px] z-10">
      <div className="h-[70px] flex items-center">
        <a href="#" className="pr-4">
          <img
            src="https://technext.github.io/corona-free-dark-bootstrap-admin-template/assets/images/logo.svg"
            alt="logo"
            className="h-6 m-auto w-[124px] align-middle"
          />
        </a>
        <a href="#" className="pr-4 hidden">
          <img
            src="https://technext.github.io/corona-free-dark-bootstrap-admin-template/assets/images/logo-mini.svg"
            alt="logo"
            className="h-6 m-auto w-[124px] align-middle"
          />
        </a>
      </div>
      <ul className="overflow-hidden flex flex-nowrap flex-col mb-[60px]">
        <li>
          <div className="flex items-center justify-between py-[0.6rem] px-[1.15rem] leading-5">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src="https://technext.github.io/corona-free-dark-bootstrap-admin-template/assets/images/faces/face15.jpg"
                  alt="profile"
                  className="h-9 w-9 rounded-full"
                />
                <span className="absolute left-[66%] top-[26px] w-2.5 h-2.5 rounded-full leading-6 border border-solid border-[#2c2e33] bg-greenColor"></span>
              </div>
              <div className="mr-4">
                <h5 className="whitespace-nowrape text-white">علی قربانی</h5>
                <span className="text-xs text-lightGray whitespace-nowrap">
                  ادمین
                </span>
              </div>
            </div>
            <a href="#">
              <BsThreeDotsVertical className="text-lightGray" />
            </a>
          </div>
        </li>
        <li className="py-2 px-5">
          <span className="text-lightGray font-medium text-sm">منو</span>
        </li>
        <li className="pl-5 mb-1">
          <Link
            to={"/"}
            className="flex items-center whitespace-nowrap relative rounded-l-[100px] text-lightGray py-3 pr-2.5 pl-9 h-[46px] hover:bg-hoverColor  hover:text-white transition-colors duration-300 before:content-[''] before:w-[3px] before:h-full before:bg-blueColor before:inline-block before:absolute before:right-0 before:top-0"
          >
            <span className="ml-2 text-sm bg-[#22242E] w-8 h-8 rounded-full flex items-center justify-center">
              <IoSpeedometerOutline className="text-purpleColor text-lg" />
            </span>
            <span className="inline-block">داشبورد</span>
          </Link>
        </li>
        <li className="pl-5 mb-1">
          <Link
            to={"/Products"}
            className="flex items-center whitespace-nowrap relative rounded-l-[100px] text-lightGray py-3 pr-2.5 pl-9 h-[46px] hover:bg-hoverColor  hover:text-white transition-colors duration-300 "
          >
            <span className="ml-2 text-sm bg-[#22242E] w-8 h-8 rounded-full flex items-center justify-center">
              <MdOutlineProductionQuantityLimits className="text-orangeColor text-lg" />
            </span>
            <span className="inline-block">محصولات</span>
          </Link>
        </li>
        <li className="pl-5 mb-1">
          <Link
            to={"/Users"}
            className="flex items-center whitespace-nowrap relative rounded-l-[100px] text-lightGray py-3 pr-2.5 pl-9 h-[46px] hover:bg-hoverColor  hover:text-white transition-colors duration-300 "
          >
            <span className="ml-2 text-sm bg-[#22242E] w-8 h-8 rounded-full flex items-center justify-center">
              <FaUsers className="text-redColor text-lg" />
            </span>
            <span className="inline-block">کاربران</span>
          </Link>
        </li>
        <li className="pl-5 mb-1">
          <Link
            to={"/orders"}
            className="flex items-center whitespace-nowrap relative rounded-l-[100px] text-lightGray py-3 pr-2.5 pl-9 h-[46px] hover:bg-hoverColor  hover:text-white transition-colors duration-300 "
          >
            <span className="ml-2 text-sm bg-[#22242E] w-8 h-8 rounded-full flex items-center justify-center">
              <RiShoppingBag3Fill className="text-blueColor text-lg" />
            </span>
            <span className="inline-block">سفارشات</span>
          </Link>
        </li>
        <li className="pl-5 mb-1">
          <Link
            to={"/comments"}
            className="flex items-center whitespace-nowrap relative rounded-l-[100px] text-lightGray py-3 pr-2.5 pl-9 h-[46px] hover:bg-hoverColor  hover:text-white transition-colors duration-300 "
          >
            <span className="ml-2 text-sm bg-[#22242E] w-8 h-8 rounded-full flex items-center justify-center">
              <BiSolidCommentDetail className="text-purpleColor text-lg" />
            </span>
            <span className="inline-block">کامنت ها</span>
          </Link>
        </li>
        <li className="pl-5 mb-1">
          <Link
            to={"/discounts"}
            className="flex items-center whitespace-nowrap relative rounded-l-[100px] text-lightGray py-3 pr-2.5 pl-9 h-[46px] hover:bg-hoverColor  hover:text-white transition-colors duration-300 "
          >
            <span className="ml-2 text-sm bg-[#22242E] w-8 h-8 rounded-full flex items-center justify-center">
              <BiSolidDiscount className="text-orangeColor text-lg" />
            </span>
            <span className="inline-block">تخفیف ها</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
