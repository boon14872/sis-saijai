

import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma';

// GET: Fetch a customer by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid customer ID' }, { status: 400 });
  }

  try {
    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.error();
  }
}

// PATCH: Update a customer by ID
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const { nickName } = await req.json();

  if (!nickName) {
    return NextResponse.json({ error: 'NickName is required' }, { status: 400 });
  }

  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: { nickName },
    });

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.error();
  }
}

// DELETE: Remove a customer by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid customer ID' }, { status: 400 });
  }

  try {
    const deletedCustomer = await prisma.customer.delete({
      where: { id },
    });

    return NextResponse.json(deletedCustomer);
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.error();
  }
}
