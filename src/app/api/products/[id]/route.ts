//src/app/api/products/[id]/route.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const product = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: {
          toppings: {
            include: {
              Topping: true,
            },
          },
        },
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  } else if (req.method === "PATCH") {
    const { productName, category, price, toppingIds } = req.body;

    try {
      const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          productName,
          category,
          price: parseInt(price),
          toppings: {
            set: toppingIds.map((toppingId: number) => ({
              toppingId: parseInt(toppingId.toString()),
            })),
          },
        },
      });
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.product.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
