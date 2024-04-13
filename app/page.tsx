export const revalidate = 0;

import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return (
      <NullData title='表示する商品がありません。 "All"をクリックしてフィルターを解除してください。' />
    );
  }

  // Merge items having the same name
  // let seenName = new Set<string>();
  // for (let i = 0; i < products.length; i++) {
  //   if (!seenName.has(products[i].name)) {
  //     seenName.add(products[i].name);
  //   } else {
  //     products.splice(i, 1);
  //   }
  // }

  const inStockProducts = products.filter((item) => item.inStock);
  const outOfStockProducts = products.filter((item) => !item.inStock);

  // Fisher Yates shuffle algorithm
  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledProducts = shuffleArray(inStockProducts);

  return (
    <div>
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap:8">
          {shuffledProducts.map((product: any) => {
            return <ProductCard data={product} key={product.id} />;
          })}
          {outOfStockProducts.map((product: any) => {
            return <ProductCard data={product} key={product.id} />;
          })}
        </div>
      </Container>
    </div>
  );
}
