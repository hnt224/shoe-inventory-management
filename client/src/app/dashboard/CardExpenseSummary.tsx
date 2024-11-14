import {
  ExpenseByCategorySummary,
  useGetDashboardMetricsQuery,
} from "@/state/api";
import { TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
// Define a type for storing expense sums by category, where each key is a category name and each value is a number representing the total expense for that category
type ExpenseSums = {
  [category: string]: number;
};

// Array of colors for the pie chart segments, to visually differentiate expense categories
const colors = ["#00C49F", "#0088FE", "#FFBB28"];

const CardExpenseSummary = () => {
  // Fetch dashboard metrics using a custom hook. Rename 'data' to 'dashboardMetrics' and check if data is loading.
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  // Extract the first element of 'expenseSummary' from 'dashboardMetrics'
  const expenseSummary = dashboardMetrics?.expenseSummary[0];

  // Extract the 'expenseByCategorySummary' array from 'dashboardMetrics' or use an empty array as a fallback
  const expenseByCategorySummary =
    dashboardMetrics?.expenseByCategorySummary || [];

  // Calculate total expenses by category, accumulating amounts within an object called 'expenseSums'
  const expenseSums = expenseByCategorySummary.reduce(
    (acc: ExpenseSums, item: ExpenseByCategorySummary) => {
      const category = item.category + " Expenses"; // Append " Expenses" to each category name
      const amount = parseInt(item.amount, 10); // Convert the amount from string to integer
      if (!acc[category]) acc[category] = 0; // Initialize category if not present
      acc[category] += amount; // Add the amount to the accumulated category sum
      return acc;
    },
    {}
  );

  // Convert 'expenseSums' into an array format suitable for charting, with each item having a 'name' and 'value' property
  const expenseCategories = Object.entries(expenseSums).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  // Calculate the total expenses by summing up all values in 'expenseCategories'
  const totalExpenses = expenseCategories.reduce(
    (acc, category: { value: number }) => acc + category.value,
    0
  );
  // Format the total expenses as a string with two decimal places
  const formattedTotalExpenses = totalExpenses.toFixed(2);

  return (
    <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        // Display a loading indicator while data is being fetched
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* HEADER section with title */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Expense Summary
            </h2>
            <hr />
          </div>

          {/* BODY section with chart and legend */}
          <div className="xl:flex justify-between pr-7">
            {/* CHART section displaying a pie chart of expenses by category */}
            <div className="relative basis-3/5">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={expenseCategories} // Data for the chart
                    innerRadius={50}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value" // Key used for chart data values
                    nameKey="name" // Key used for chart data names
                    cx="50%"
                    cy="50%"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]} // Cycle through colors for each category
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Display the formatted total expenses in the center of the chart */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-2/5">
                <span className="font-bold text-xl">
                  ${formattedTotalExpenses}
                </span>
              </div>
            </div>

            {/* LABELS section with category names and color indicators */}
            <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
              {expenseCategories.map((entry, index) => (
                <li
                  key={`legend-${index}`}
                  className="flex items-center text-xs"
                >
                  {/* Color indicator for each category */}
                  <span
                    className="mr-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></span>
                  {entry.name}
                </li>
              ))}
            </ul>
          </div>

          {/* FOOTER section with summary details */}
          <div>
            <hr />
            {expenseSummary && (
              <div className="mt-3 flex justify-between items-center px-7 mb-4">
                <div className="pt-2">
                  {/* Display the average expense */}
                  <p className="text-sm">
                    Average:{" "}
                    <span className="font-semibold">
                      ${expenseSummary.totalExpenses.toFixed(2)}
                    </span>
                  </p>
                </div>
                {/* Display an indicator with a trend icon */}
                <span className="flex items-center mt-2">
                  <TrendingUp className="mr-2 text-green-500" />
                  30%
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardExpenseSummary;
