import mongoose from "mongoose";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { Product } from "../models/product";
import { mongooseConnect } from "../lib/mongoose";
import LatestProducts from "../components/LatestProducts";

export default function Home({ featuredProduct, NewProducts }) {
  return (
    <>
      <Header />
      <Hero product={featuredProduct} />
      <LatestProducts products={NewProducts} />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const featuredProductId = "64b28fef6d6ec03f3bbf80af";
  const featuredProduct = await Product.findById(featuredProductId);
  const NewProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      NewProducts: JSON.parse(JSON.stringify(NewProducts)),
    },
  };
}
