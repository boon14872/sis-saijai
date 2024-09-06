import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma';

// GET: Fetch all employees
export async function GET() {
  try {
    const employees = await prisma.employee.findMany();
    return NextResponse.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json({ error: "Failed to load employees" }, { status: 500 });
  }
}

// POST: Add a new employee
export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    console.log("Request body:", json);

    const { firstName, lastName, email, phoneNumber, position, hireDate, salary } = json;

    // Validate if all required fields are present
    if (!firstName || !lastName || !email || !phoneNumber || !position || !hireDate || !salary) {
      console.log("Validation failed: Missing fields");
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Validate phone number length
    if (phoneNumber.length !== 10) {
      return NextResponse.json({ error: "Phone number must be exactly 10 digits" }, { status: 400 });
    }

    const newEmployee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        position,
        hireDate: new Date(hireDate), // Ensure correct date format
        salary: parseFloat(salary),   // Ensure salary is a float number
      },
    });

    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.error("Error adding employee:", error);
    return NextResponse.json({ error: "Failed to add employee" }, { status: 500 });
  }
}
