// src\app\api\employees\[id]\route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma";

// PATCH: Update an employee by ID
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await req.json();
  
    try {
      if (!body.phoneNumber || body.phoneNumber.length !== 10) {
        return NextResponse.json({ error: "Phone number must be exactly 10 digits" }, { status: 400 });
      }
  
      const updatedEmployee = await prisma.employee.update({
        where: { id: parseInt(id) },
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
      return NextResponse.json(updatedEmployee);
    } catch (error) {
      console.error("Error updating employee:", error);
      return NextResponse.error();
    }
  }

// DELETE: Delete an employee by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
      const deletedEmployee = await prisma.employee.delete({
        where: { id: parseInt(id) },
      });
      return NextResponse.json(deletedEmployee);
    } catch (error) {
      console.error("Error deleting employee:", error);
      return NextResponse.error();
    }
  }
