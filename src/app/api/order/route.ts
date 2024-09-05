import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { items } = await request.json();

  // คำนวณยอดรวม
  let total = 0;
  const orderItems = await Promise.all(
    items.map(async (item: { id: number; quantity: number }) => {
      const menuItem = await prisma.menuItem.findUnique({ where: { id: item.id } });
      if (menuItem) {
        total += menuItem.price * item.quantity;
        return { menuItemId: menuItem.id, quantity: item.quantity };
      }
      return null;
    })
  );

  const order = await prisma.order.create({
    data: {
      total,
      items: { create: orderItems.filter(Boolean) }
    }
  });

  return NextResponse.json({ success: true, order }, { status: 201 });
}
