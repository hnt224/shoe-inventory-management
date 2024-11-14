import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "@/app/(components)/Header";

// Define the structure of the product data
type ProductFormData = {
  name: string; // Name of the product
  price: number; // Price of the product
  stockQuantity: number; // Quantity available in stock
  rating: number; // Rating of the product
};

// Define props for CreateProductModal component
type CreateProductModalProps = {
  isOpen: boolean; // Flag to show/hide modal
  onClose: () => void; // Function to close the modal
  onCreate: (formData: ProductFormData) => void; // Function to create a new product
};

// Component to handle the creation of a new product
const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  // Form data with default values, generating a unique product ID
  const [formData, setFormData] = useState({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  // Handle input changes and update form data state
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value) // Parse numeric values
          : value, // Handle non-numeric values
    });
  };

  // Handle form submission to create a new product
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData); // Trigger product creation
    onClose(); // Close the modal
  };

  // If modal is not open, render nothing
  if (!isOpen) return null;

  // Define CSS classes for form elements
  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    // Modal container with overlay and centered content
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        {/* Modal header */}
        <Header name="Create New Product" />

        {/* Product creation form */}
        <form onSubmit={handleSubmit} className="mt-5">
          {/* PRODUCT NAME */}
          <label htmlFor="productName" className={labelCssStyles}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={inputCssStyles}
            required
          />

          {/* PRICE */}
          <label htmlFor="productPrice" className={labelCssStyles}>
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
            className={inputCssStyles}
            required
          />

          {/* STOCK QUANTITY */}
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            className={inputCssStyles}
            required
          />

          {/* RATING */}
          <label htmlFor="rating" className={labelCssStyles}>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating}
            className={inputCssStyles}
            required
          />

          {/* Action buttons */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button
            onClick={onClose}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
