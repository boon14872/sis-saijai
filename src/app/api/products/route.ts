import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all products
export async function GET() {
  try {
    const products = await prisma.products.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products." }, { status: 500 });
  }
}
// POST to add a new product
export async function POST(request: Request) {
    try {
      const body = await request.json();
      const { productName, category, price, image } = body;
  
      // ตรวจสอบว่ามีข้อมูลครบถ้วนหรือไม่
      if (!productName || !category || !price || !image) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
  
      const newProduct = await prisma.products.create({
        data: {
          productName,
          category,
          price,
          image: Buffer.from(image, 'base64'), // แปลง Base64 เป็น binary
        },
      });
  
      return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
      console.error('Error creating product:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
