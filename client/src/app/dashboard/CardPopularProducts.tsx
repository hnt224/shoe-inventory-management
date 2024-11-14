import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag } from "lucide-react";
import React from "react";
import Rating from "../(components)/Rating";
import Image from "next/image";
const CardPopularProducts = () => {
  // Destructure data and loading state from the API hook for dashboard metrics
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      {isLoading ? (
        // Display a loading indicator if data is still being fetched
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* HEADER: Display the title for the popular products section */}
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Popular Products
          </h3>
          <hr />

          {/* BODY: Scrollable list of popular products */}
          <div className="overflow-auto h-full">
            {dashboardMetrics?.popularProducts.map((product) => (
              <div
                key={product.productId} // Unique key for each product
                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
              >
                {/* PRODUCT INFO: Displays image, name, price, and rating */}
                <div className="flex items-center gap-3">
                  {/* Randomly select a product image from S3 based on product ID */}
                  <Image
                    src={`https://s3-shoe-inventory-management.s3.us-east-2.amazonaws.com/product${
                      Math.floor(Math.random() * 6) + 1
                    }.png`}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="rounded-lg w-14 h-14"
                  />
                  {/* PRODUCT DETAILS: Name and pricing information */}
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700">
                      {product.name}
                    </div>
                    <div className="flex text-sm items-center">
                      {/* Display the product price */}
                      <span className="font-bold text-blue-500 text-xs">
                        ${product.price}
                      </span>
                      <span className="mx-2">|</span>
                      {/* Display the product rating */}
                      <Rating rating={product.rating || 0} />
                    </div>
                  </div>
                </div>

                {/* PRODUCT ACTIONS: Button to add to cart and display stock quantity */}
                <div className="text-xs flex items-center">
                  {/* Button with cart icon for adding product to shopping cart */}
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  {/* Display stock quantity in thousands */}
                  {Math.round(product.stockQuantity / 1000)}k Sold
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
