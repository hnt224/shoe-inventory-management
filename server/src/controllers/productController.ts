import { Request, Response} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const search = req.query.search?.toString(); // Optional search query for filtering
        const products = await prisma.products.findMany({
            where: {
                name: {
                    contains: search, // Filters products by name containing the search term
                },
            },
        });

        res.json(products); // Returns the filtered list of products as JSON
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products" }); // Error handling
    }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId, name, price, rating, stockQuantity } = req.body; // Destructure product details from request body
        const product = await prisma.products.create({
            data: {
                productId,
                name,
                price,
                rating,
                stockQuantity,
            },
        });
        res.status(201).json(product); // Returns the created product with a 201 status code
    } catch (error) {
        res.status(500).json({ message: "Error creating product" }); // Error handling
    }
};
