import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Import functions to create API with RTK Query

// Define a Product interface to describe the structure of each product item
export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number; // Rating is optional
  stockQuantity: number;
}

// Define NewProduct interface to describe the structure of a new product item
export interface NewProduct {
  name: string;
  price: number;
  rating?: number; // Rating is optional
  stockQuantity: number;
}

// Define SalesSummary interface for sales data structure
export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number; // Percentage change is optional
  date: string;
}

// Define PurchaseSummary interface for purchase data structure
export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number; // Percentage change is optional
  date: string;
}

// Define ExpenseSummary interface for expense data structure
export interface ExpenseSummary {
  expenseSummarId: string;
  totalExpenses: number;
  date: string;
}

// Define ExpenseByCategorySummary interface for category-wise expense structure
export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

// Define DashboardMetrics interface to include various dashboard summaries
export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

// Define User interface for user data structure
export interface User {
  userId: string;
  name: string;
  email: string;
}

// Create an API slice using RTK Query
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }), // Define base query with API base URL
  reducerPath: "api", // Set the path for storing the API reducer in the Redux state
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"], // Tags used for cache invalidation
  endpoints: (build) => ({
    // Endpoint for fetching dashboard metrics
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard", // Fetch data from /dashboard endpoint
      providesTags: ["DashboardMetrics"], // Provides tag for cache invalidation
    }),
    // Endpoint for fetching a list of products, with optional search parameter
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {}, // Attach search query if provided
      }),
      providesTags: ["Products"], // Provides tag for cache invalidation
    }),
    // Endpoint for creating a new product
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST", // Use POST method to create a product
        body: newProduct, // Pass new product data in the request body
      }),
      invalidatesTags: ["Products"], // Invalidate products cache to refetch data
    }),
    // Endpoint for fetching a list of users
    getUsers: build.query<User[], void>({
      query: () => "/users", // Fetch data from /users endpoint
      providesTags: ["Users"], // Provides tag for cache invalidation
    }),
    // Endpoint for fetching expenses by category
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => "/expenses", // Fetch data from /expenses endpoint
      providesTags: ["Expenses"], // Provides tag for cache invalidation
    }),
  }),
});

// Export auto-generated hooks for each endpoint to simplify usage
export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useGetExpensesByCategoryQuery,
} = api;
