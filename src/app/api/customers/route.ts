import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma';

// GET: Fetch all customers
export async function GET() {
    try {
      const customers = await prisma.customer.findMany();
      return NextResponse.json(customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
      return NextResponse.json({ error: "Failed to load customers" }, { status: 500 });
    }
  }


// POST: Add a new customer
export async function POST(req: NextRequest) {
    try {
      const { nickName } = await req.json();
  
      if (!nickName) {
        return NextResponse.json({ error: "NickName is required" }, { status: 400 });
      }
  
      const newCustomer = await prisma.customer.create({
        data: { nickName },
      });
  
      return NextResponse.json(newCustomer, { status: 201 });
    } catch (error) {
      console.error("Error creating customer:", error);
      return NextResponse.json({ error: "Failed to add customer" }, { status: 500 });
    }
  }
  
  // DELETE: Remove a customer by ID
  export async function DELETE(req: NextRequest) {
    try {
      const { id } = await req.json();
  
      if (!id) {
        return NextResponse.json({ error: "Customer ID is required" }, { status: 400 });
      }
  
      const deletedCustomer = await prisma.customer.delete({
        where: { id },
      });
  
      return NextResponse.json(deletedCustomer, { status: 200 });
    } catch (error) {
      console.error("Error deleting customer:", error);
      return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 });
    }
  }
