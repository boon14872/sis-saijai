// import { NextRequest, NextResponse } from "next/server";
// import prisma from "../../../prisma";

// // GET: ดึงข้อมูลออเดอร์ทั้งหมด
// export async function GET() {
//   try {
//     const orders = await prisma.order.findMany({
//       include: {
//         Customer: true, // รวมข้อมูลลูกค้าในออเดอร์
//         OrderDetails: {
//           include: {
//             Product: true, // รวมข้อมูลสินค้าภายใน OrderDetail
//           },
//         },
//       },
//     });
//     return NextResponse.json(orders);
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     return NextResponse.error();
//   }
// }

// // POST: สร้างออเดอร์ใหม่
// export async function POST(req: NextRequest) {
//   try {
//     const { customerId, totalAmount, orderDetails } = await req.json();
//     const newOrder = await prisma.order.create({
//       data: {
//         customerId,
//         orderDate: new Date(),
//         totalAmount,
//         paymentStatus: "Pending", // ค่าเริ่มต้นเป็น Pending
//         OrderDetails: {
//           create: orderDetails.map((detail: any) => ({
//             productId: detail.productId,
//             quantity: detail.quantity,
//             priceAtOrder: detail.priceAtOrder,
//           })),
//         },
//       },
//     });
//     return NextResponse.json(newOrder);
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return NextResponse.error();
//   }
// }

// // PUT: อัปเดตสถานะของออเดอร์
// export async function PUT(req: NextRequest) {
//   try {
//     const { orderId, status } = await req.json();
//     const updatedOrder = await prisma.order.update({
//       where: { id: orderId },
//       data: { paymentStatus: status },
//     });
//     return NextResponse.json(updatedOrder);
//   } catch (error) {
//     console.error("Error updating order:", error);
//     return NextResponse.error();
//   }
// }
