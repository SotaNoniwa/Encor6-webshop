import prisma from "@/libs/prismadb";

interface IParams {
  productId?: string;
}

export default async function getProductById(params: IParams) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.productId },
    });

    if (!product) {
      return null;
    }

    return product;
  } catch (error: any) {
    throw new Error(error);
  }
}
