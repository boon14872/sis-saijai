import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';
//import { nanoid } from 'nanoid'; // ใช้สำหรับสร้างชื่อไฟล์ที่ไม่ซ้ำกัน

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
      const formData = await request.formData();
      const productName = formData.get('productName') as string;
      const category = formData.get('category') as string;
      const price = parseInt(formData.get('price') as string);
      const image = Buffer.from(formData.get('image') as string, 'base64');
  
      if (!productName || !category || !price || !image) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
  
      const newProduct = await prisma.products.create({
        data: {
          productName,
          category,
          price,
          image,
        },
      });
  
      return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
      console.error('Error creating product:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  

export async function GET() {
  try {
    const products = await prisma.products.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products." }, { status: 500 });
  }
}
