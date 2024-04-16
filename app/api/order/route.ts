import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "USER") {
    return NextResponse.error();
  }

  const userId = currentUser.id;
  const body = await request.json();
  const {
    productId,
    name,
    description,
    price,
    category,
    image,
    quantity,
    isPaid,
  } = body;

  const order = await prisma.order.create({
    data: {
      userId,
      productId,
      name,
      description,
      price,
      category,
      image,
      quantity,
      isPaid,
    },
  } as any);

  return NextResponse.json(order);
}
