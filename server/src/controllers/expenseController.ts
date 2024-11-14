import { Request, Response } from "express"; // Import Request and Response types from Express
import { PrismaClient } from "@prisma/client"; // Import PrismaClient to interact with the database

// Initialize Prisma client to communicate with the database
const prisma = new PrismaClient();

// Define the getExpensesByCategory function to handle the request
export const getExpensesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Fetch all expenses by category, ordered by date in descending order
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
      orderBy: {
        date: "desc",
      },
    });

    // Map through the results to convert the amount field to a string for consistent data formatting
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(), // Convert amount to a string
    }));

    // Respond with the formatted data as JSON
    res.json(expenseByCategorySummary);
  } catch (error) {
    // If an error occurs, send a 500 status code with an error message
    res.status(500).json({ message: "Error retrieving expenses by category" });
  }
};
