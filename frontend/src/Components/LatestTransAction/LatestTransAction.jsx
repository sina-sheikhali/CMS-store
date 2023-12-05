import React from "react";
import { latestTransActionData } from "../../datas";
export default function LatestTransAction() {
  return (
    <div className="p-5 bg-grayColor rounded-md min-w-[450px] flex-[65%] ">
      <h2 className="text-xl font-bold mb-8">آخرین تراکنش ها</h2>
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
                تاریخ
              </th>
              <th className="px-8 py-4 border-b border-solid border-[#2c2e33] align-bottom font-bold whitespace-nowrap text-sm leading-4">
                مبلغ
              </th>
              <th className="px-8 py-4 border-b border-solid border-[#2c2e33] align-bottom font-bold whitespace-nowrap text-sm leading-4">
                وضعیت
              </th>
            </tr>
          </thead>
          <tbody className="table-row-group">
            {latestTransActionData.map((action) => (
              <tr className="table-row" key={action.id}>
                <td
                  className={`${
                    action.id === latestTransActionData.length
                      ? null
                      : "border-b border-solid border-[#2c2e33]"
                  } px-8 py-4 align-middle  table-cell font-bold whitespace-nowrap text-sm leading-4 text-center`}
                >
                  <img
                    src={action.profile}
                    alt="profile"
                    className="h-9 w-9 rounded-full"
                  />
                </td>
                <td
                  className={`${
                    action.id === latestTransActionData.length
                      ? null
                      : "border-b border-solid border-[#2c2e33]"
                  } px-8 py-4 align-middle  table-cell font-bold whitespace-nowrap text-sm leading-4 text-center`}
                >
                  {action.username}
                </td>
                <td
                  className={`${
                    action.id === latestTransActionData.length
                      ? null
                      : "border-b border-solid border-[#2c2e33]"
                  } px-8 py-4 align-middle  table-cell font-bold whitespace-nowrap text-sm leading-4 text-center`}
                >
                  {action.date}
                </td>
                <td
                  className={`${
                    action.id === latestTransActionData.length
                      ? null
                      : "border-b border-solid border-[#2c2e33]"
                  } px-8 py-4 align-middle  table-cell font-bold whitespace-nowrap text-sm leading-4 text-center`}
                >
                  {action.amount}
                  <span className="text-xs">تومان</span>
                </td>
                <td
                  className={`${
                    action.id === latestTransActionData.length
                      ? null
                      : "border-b border-solid border-[#2c2e33]"
                  } px-8 py-4 align-middle  table-cell font-bold whitespace-nowrap text-sm leading-4 text-center`}
                >
                  {action.status === 0 && (
                    <span className="px-3 py-1 rounded-md text-xs text-white bg-redColor">
                      لغو شده
                    </span>
                  )}
                  {action.status === 1 && (
                    <span className="px-3 py-1 rounded-md text-xs text-white bg-orangeColor">
                      در انتظار پرداخت
                    </span>
                  )}
                  {action.status === 2 && (
                    <span className="px-3 py-1 rounded-md text-xs text-white bg-purpleColor">
                      در حال پردازش
                    </span>
                  )}
                  {action.status === 3 && (
                    <span className="px-3 py-1 rounded-md text-xs text-white bg-greenColor">
                      موفقیت آمیز
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
