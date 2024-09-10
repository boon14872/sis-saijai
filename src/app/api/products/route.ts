import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import path from "path";

import fs from "fs/promises";
import prisma from "@/prisma";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const productName = formData.get("productName") as string;
    const category = formData.get("category") as string;
    const price = parseInt(formData.get("price") as string);
    const image = formData.get("image") as string;

    if (!productName || !category || !price || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // covert image from base64 to file
    const base64Data = image.split(";base64,").pop();
    const filename = `${productName}.png`;
    const filePath = path.join(process.cwd(), "public", filename);

    if (base64Data === undefined) {
      return NextResponse.json(
        { error: "Invalid image data" },
        { status: 400 }
      );
    }
    try {
      await fs.writeFile(filePath, base64Data, { encoding: "base64" });
    } catch (error) {
      console.error("Error writing image file:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }

    const newProduct = await prisma.products.create({
      data: {
        productName,
        category,
        price,
        image: filename,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await prisma.products.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products." },
      { status: 500 }
    );
  }
}
