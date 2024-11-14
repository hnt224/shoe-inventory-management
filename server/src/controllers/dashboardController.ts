import { Request, Response } from "express"; // Import Request and Response types from Express
import { PrismaClient } from "@prisma/client"; // Import PrismaClient to interact with the database

// Initialize the Prisma client to communicate with the database
const prisma = new PrismaClient();

// Define the getDashboardMetrics function to retrieve and send dashboard data
export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Fetch the top 15 popular products, sorted by stock quantity in descending order
    const popularProducts = await prisma.products.findMany({
      take: 15,
      orderBy: {
        stockQuantity: "desc",
      },
    });

    // Fetch the 5 most recent sales summary entries, sorted by date in descending order
    const salesSummary = await prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });

    // Fetch the 5 most recent purchase summary entries, sorted by date in descending order
    const purchaseSummary = await prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });

    // Fetch the 5 most recent expense summary entries, sorted by date in descending order
    const expenseSummary = await prisma.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });

    // Fetch the 5 most recent expense summaries by category, sorted by date in descending order
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });

    // Map over each item to convert the amount field to a string (useful for consistent formatting)
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    // Respond with the collected metrics as a JSON object
    res.json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary,
    });
  } catch (error) {
    // If an error occurs, respond with a 500 status code and an error message
    res.status(500).json({ message: "Error retrieving dashboard metrics" });
  }
};
