// Import necessary modules: LucideIcon for icons and React for JSX components
import { LucideIcon } from "lucide-react";
import React from "react";

// Define the type for each statistic detail to be displayed on the StatCard
// Each StatDetail has a title, amount, changePercentage, and an icon component
type StatDetail = {
  title: string;
  amount: string;
  changePercentage: number;
  IconComponent: LucideIcon;
};

// Define the type for the StatCard component's props
// It includes a title, primary icon, an array of details, and a date range
type StatCardProps = {
  title: string;
  primaryIcon: JSX.Element;
  details: StatDetail[];
  dateRange: string;
};

// Define the StatCard component
const StatCard = ({
  title,
  primaryIcon,
  details,
  dateRange,
}: StatCardProps) => {
  // Helper function to format the change percentage with a "+" sign for positive values
  const formatPercentage = (value: number) => {
    const signal = value >= 0 ? "+" : "";
    return `${signal}${value.toFixed()}%`;
  };

  // Helper function to determine the color for percentage change (green for positive, red for negative)
  const getChangeColor = (value: number) =>
    value >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="md:row-span-1 xl:row-span-2 bg-white col-span-1 shadow-md rounded-2xl flex flex-col justify-between">
      {/* HEADER */}
      <div>
        <div className="flex justify-between items-center mb-2 px-5 pt-4">
          {/* Card title and date range display */}
          <h2 className="font-semibold text-lg text-gray-700">{title}</h2>
          <span className="text-xs text-gray-400">{dateRange}</span>
        </div>
        <hr />
      </div>

      {/* BODY */}
      <div className="flex mb-6 items-center justify-around gap-4 px-5">
        {/* Display primary icon with styling */}
        <div
          className="rounded-full p-5 bg-blue-50 border-sky-300 border-[1px]"
          aria-label="Primary Icon"
        >
          {primaryIcon}
        </div>

        {/* Display statistic details */}
        <div className="flex-1">
          {details.map((detail, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center justify-between my-4">
                {/* Display detail title */}
                <span className="text-gray-500">{detail.title}</span>

                {/* Display detail amount formatted with locale */}
                <span className="font-bold text-gray-800">
                  {parseFloat(detail.amount).toLocaleString("en")}
                </span>

                {/* Display change percentage with icon */}
                <div className="flex items-center">
                  <detail.IconComponent
                    className={`w-4 h-4 mr-1 ${getChangeColor(
                      detail.changePercentage
                    )}`}
                    aria-label={`${formatPercentage(
                      detail.changePercentage
                    )} change`}
                  />
                  <span
                    className={`font-medium ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  >
                    {formatPercentage(detail.changePercentage)}
                  </span>
                </div>
              </div>
              {/* Display a divider between details */}
              {index < details.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
