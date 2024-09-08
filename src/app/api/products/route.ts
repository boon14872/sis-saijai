// src/app/api/products/route.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany({
        include: {
          toppings: {
            include: {
              Topping: true,  // Include topping details
            },
          },
        },
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  } else if (req.method === "POST") {
    const { productName, category, price, toppingIds } = req.body;

    try {
      const newProduct = await prisma.product.create({
        data: {
          productName,
          category,
          price: parseInt(price),
          toppings: {
            create: toppingIds.map((toppingId: number) => ({
              toppingId: parseInt(toppingId.toString()),
            })),
          },
        },
      });
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: "Failed to add product" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
