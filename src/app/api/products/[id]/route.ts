import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET product by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  try {
    const product = await prisma.products.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Failed to fetch product." }, { status: 500 });
  }
}

// PATCH (update) product by ID
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const body = await request.json();
  const { productName, category, price, image } = body;

  try {
    const updatedProduct = await prisma.products.update({
      where: { id },
      data: {
        productName,
        category,
        price,
        image: Buffer.from(image.split(",")[1], 'base64'), // Update image as binary
      },
    });
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product." }, { status: 500 });
  }
}

// DELETE product by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  try {
    await prisma.products.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Product deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product." }, { status: 500 });
  }
}
