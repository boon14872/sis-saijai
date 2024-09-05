// import { NextRequest, NextResponse } from "next/server";
// import prisma from "../../prisma";

// export async function GET() {
//     const data =  await prisma.customer.findMany();
//     console.log(data);
//     return NextResponse.json(data);
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { nickName } = await req.json();
//     const newCustomer = await prisma.customer.create({
//       data: { nickName },
//     });
//     return NextResponse.json(newCustomer);
//   } catch (error) {
//     console.error("Error creating customer:", error);
//     return NextResponse.error();
//   }
// }