// src/app/api/customers/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma";

// ดึงข้อมูลลูกค้าทั้งหมด
export async function GET() {
  try {
    const customers = await prisma.customer.findMany();
    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.error();
  }
}

// เพิ่มลูกค้าใหม่
export async function POST(req: NextRequest) {
  try {
    const { nickName } = await req.json();

    // ตรวจสอบว่า nickName ถูกส่งมาหรือไม่
    if (!nickName) {
      return NextResponse.json({ error: "NickName is required" }, { status: 400 });
    }

    const newCustomer = await prisma.customer.create({
      data: { nickName },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.error();
  }
}
