import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../prisma";

// GET: ดึงข้อมูลพนักงานทั้งหมด
export async function GET() {
  try {
    const employees = await prisma.employee.findMany();
    return NextResponse.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.error();
  }
}

// POST: เพิ่มพนักงานใหม่
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newEmployee = await prisma.employee.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        position: body.position,
        hireDate: new Date(body.hireDate),
        salary: body.salary,
      },
    });
    return NextResponse.json(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.error();
  }
}

// DELETE: ลบพนักงานตาม ID ที่ส่งมาใน URL
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // รับ id จาก URL

  try {
    const deletedEmployee = await prisma.employee.delete({
      where: { id: Number(id) },  // ลบพนักงานตาม ID
    });
    return NextResponse.json(deletedEmployee);
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.error();
  }
}
