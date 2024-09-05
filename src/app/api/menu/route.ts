import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const menuItems = await prisma.menuItem.findMany();
  return NextResponse.json(menuItems);
}

export async function POST(request: Request) {
  const { name, price } = await request.json();
  const newItem = await prisma.menuItem.create({
    data: { name, price: parseFloat(price) }
  });
  return NextResponse.json(newItem, { status: 201 });
}
