
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma';

// GET: Fetch all customers
export async function GET() {
  try {
    const customers = await prisma.customer.findMany();
    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ error: 'Failed to load customers' }, { status: 500 });
  }
}

// POST: Add a new customer
export async function POST(req: NextRequest) {
  try {
    const { nickName } = await req.json();

    if (!nickName) {
      return NextResponse.json({ error: 'Nickname is required' }, { status: 400 });
    }

    const newCustomer = await prisma.customer.create({
      data: { nickName },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error('Error adding customer:', error);
    return NextResponse.json({ error: 'Failed to add customer' }, { status: 500 });
  }
}
