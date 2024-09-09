import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: ดึงข้อมูลสินค้าคงคลังทั้งหมด
export async function GET() {
  try {
    const inventories = await prisma.inventory.findMany(); // ดึงข้อมูลทั้งหมดจากตาราง Inventory
    return NextResponse.json(inventories);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inventories." }, { status: 500 });
  }
}

// POST: เพิ่มสินค้าคงคลังใหม่
export async function POST(request: Request) {
  try {
    const { inventoryName, quantity } = await request.json(); // อ่านข้อมูลจาก body ของ request
    const newInventory = await prisma.inventory.create({
      data: {
        inventoryName,
        quantity,
      },
    });
    return NextResponse.json(newInventory);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create inventory." }, { status: 500 });
  }
}
