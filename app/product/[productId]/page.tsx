import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";

interface IParams {
  productId?: string;
}

const Product = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params);

  if (!product) {
    return <NullData title="IDにマッチする商品がありません" />;
  }

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
      </Container>
    </div>
  );
};

export default Product;
