"use client";

import { Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { formatNumber } from "@/utils/formatNumber";

interface SummaryProps {
  products: Product[];
  users: User[];
}

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};

const Summary: React.FC<SummaryProps> = ({ products, users }) => {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    products: {
      label: "商品の総数",
      digit: 0,
    },
    users: {
      label: "ユーザー数",
      digit: 0,
    },
  });

  useEffect(() => {
    setSummaryData((prev) => {
      let data = { ...prev };

      data.products.digit = products.length;
      data.users.digit = users.length;

      return data;
    });
  }, [products, users]);

  // get all keys
  const summaryKeys = Object.keys(summaryData);

  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mb-4 mt-8">
        <Heading title="ダッシュボード" center />
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
        {summaryKeys &&
          summaryKeys.map((key) => {
            return (
              <div
                key={key}
                className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
              >
                <div className="text-xl md:text-4xl font-bold">
                  {<>{formatNumber(summaryData[key].digit)}</>}
                </div>
                <div>{summaryData[key].label}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Summary;
