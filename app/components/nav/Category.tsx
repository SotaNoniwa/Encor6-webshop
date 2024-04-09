"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import queryString from "query-string";
import { useSearchParams } from "next/dist/client/components/navigation";

interface CategoryProps {
  label: string;
  icon: IconType;
  color?: string;
  selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({
  label,
  icon: Icon,
  color,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    if (label === "All") {
      router.push("/");
    } else {
      let currentQuery = {};

      if (params) {
        currentQuery = queryString.parse(params.toString());
      }

      const updatedQuery = {
        ...currentQuery,
        category: label,
      };

      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    }
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center text-center text-nowrap gap-1 p-2 border-t-4 hover:text-slate-800 transition cursor-pointer 
      ${
        selected
          ? "border-t-yellow-300 text-slate-800 bg-gradient-to-b from-yellow-100 to-yellow-50"
          : "border-transparent text-slate-500"
      }`}
    >
      <Icon size={20} color={`${selected ? color : ""}`} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default Category;
