import React from "react";
import { IoEyeSharp } from "react-icons/io5";
import { newMembersData } from "../../datas";
export default function NewMembers() {
  return (
    <div className="p-5 bg-grayColor rounded-md min-w-[250px] flex-[35%] ">
      <h2 className="text-xl font-bold mb-8">عضوهای جدید</h2>
      <div className=" block w-full overflow-x-auto">
        <table className="text-lightGray border-collapse table border-spacing-[2px]  border-gray-500 w-full">
          <thead>
            <tr className="table-row">
              <th className="px-8 py-4 border-b border-solid border-[#2c2e33] align-bottom font-bold whitespace-nowrap text-sm leading-4">
                پروفایل
              </th>
              <th className="px-8 py-4 border-b border-solid border-[#2c2e33] align-bottom font-bold whitespace-nowrap text-sm leading-4">
                نام کاربری
              </th>
              <th className="px-8 py-4 border-b border-solid border-[#2c2e33] align-bottom font-bold whitespace-nowrap text-sm leading-4">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="">
            {newMembersData.map((member) => (
              <tr className="table-row" key={member.id}>
                <td
                  className={`${
                    member.id == newMembersData.length
                      ? null
                      : "border-b border-solid border-[#2c2e33]"
                  } px-8 py-4  align-middle  table-cell font-bold whitespace-nowrap text-sm leading-4 text-center`}
                >
                  <img
                    src={member.profile}
                    alt="profile"
                    className="h-9 w-9 rounded-full"
                  />
                </td>
                <td
                  className={`${
                    member.id == newMembersData.length
                      ? null
                      : "border-b border-solid border-[#2c2e33]"
                  } px-8 py-4  align-middle  table-cell font-bold whitespace-nowrap text-sm leading-4 text-center`}
                >
                  {member.username}
                </td>
                <td
                  className={`${
                    member.id == newMembersData.length
                      ? null
                      : "border-b border-solid border-[#2c2e33]"
                  } px-8 py-4  align-middle  table-cell font-bold whitespace-nowrap text-sm leading-4 text-center`}
                >
                  <div className="flex justify-center bg-lightGray text-white rounded-md">
                    <IoEyeSharp className="h-5 w-5" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
