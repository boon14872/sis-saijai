import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PATCH: แก้ไขสินค้าคงคลังตาม ID
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { inventoryName, quantity } = await request.json(); // รับข้อมูลจาก request body
    const updatedInventory = await prisma.inventory.update({
      where: { id: Number(params.id) }, // อัปเดตสินค้าตาม ID
      data: {
        inventoryName,
        quantity,
      },
    });
    return NextResponse.json(updatedInventory);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update inventory." }, { status: 500 });
  }
}

// DELETE: ลบสินค้าคงคลังตาม ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.inventory.delete({
      where: { id: Number(params.id) }, // ลบสินค้าตาม ID
    });
    return NextResponse.json({ message: "Inventory deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete inventory." }, { status: 500 });
  }
}
