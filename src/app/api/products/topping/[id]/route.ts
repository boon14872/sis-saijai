// src/app/api/toppings/[id]/route.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      await prisma.topping.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ message: "Topping deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete topping" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
