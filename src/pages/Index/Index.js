import React from "react";
import FinancialBox from "../../Components/Features/Features";
import {
  ResponsiveContainer,
  Line,
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { axisData } from "../../datas";
import NewMembers from "../../Components/NewMembers/NewMembers";

import LatestTransAction from "../../Components/LatestTransAction/LatestTransAction";

export default function Index() {
  return (
    <div className="p-3">
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  gap-5">
        <FinancialBox
          Amount={"3,000,000"}
          percent={"7%-"}
          title={"هزینه ها"}
          IsAsc={false}
        />
        <FinancialBox
          Amount={"12,200,000"}
          percent={"9%+"}
          title={"درآمد"}
          IsAsc={true}
        />
        <FinancialBox
          Amount={"5,110,000"}
          percent={"11%+"}
          title={"سود"}
          IsAsc={true}
        />
        <FinancialBox
          Amount={"3,010,000"}
          percent={"2.2%+"}
          title={"سود خالص"}
          IsAsc={true}
        />
      </div>
      <div className="text-white bg-grayColor p-5  my-5 rounded-md">
        <h2 className="text-2xl mb-5 mr-7 font-bold">فروش ماهانه</h2>
        <ResponsiveContainer width="100%" aspect={4}>
          <LineChart
            data={axisData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid stroke="#0090E7" strokeDasharray="2" />
            <XAxis dataKey="name" stroke="#00d25b" />
            <Tooltip />
            <Line
              type="monotone"
              stroke="#FC424A"
              dataKey={"sale"}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-5 w-full text-white  break-words ">
        <NewMembers />
        <LatestTransAction />
      </div>
    </div>
  );
}
