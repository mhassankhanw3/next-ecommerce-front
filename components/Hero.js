import React, { useContext, useEffect } from "react";
import img from "../public/images/gg.png";
import Image from "next/image";
import SolidButton from "./SolidButton";
import OutlineButton from "./OutlineButton";
import { BiSolidCart } from "react-icons/bi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CartContext } from "../context/Main";

export default function Hero({ product }) {
  const { cartProducts, setCartProducts, addProducts } =
    useContext(CartContext);
  const addFeaturedToCart = () => {
    addProducts(product?._id);
  };
  useEffect(() => {
    console.log(cartProducts, "cartProducts");
  }, [cartProducts]);
  return (
    <div className="bg-[#222] m-0 p-[1px] ">
      <div className="flex items-center justify-center gap-[100px] my-[80px] max-w-[100%] w-[60%] mx-auto">
        <div className="max-w-[100%] w-[45%]">
          <h1 className="text-[48px] text-gray-200 font-medium">
            {product.title}
          </h1>
          <p className="text-gray-300 max-w-[100%] text-[18px] mt-[20px]">
            {product.desc}
          </p>
          <div className="flex items-center gap-[10px] mt-[10px]">
            <OutlineButton
              href={"/products/" + product._id}
              title={"Read more"}
            />
            <SolidButton
              title={"Add to cart"}
              icon={
                <BiSolidCart className="text-[22px] text-gray-700 mr-[2px]" />
              }
              clickFunc={addFeaturedToCart}
            />
          </div>
        </div>
        <div className="flex items-center text-gray-900 justify-center transition-all max-w-[100%] w-[50%]">
          <Carousel
            showArrows={false}
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={3000}
            renderIndicator={() => null}
            showStatus={false}
            // Remove default indicator rendering
          >
            {product?.images.map((image, index) => (
              <div
                key={index}
                className="carousel-image-wrapper aspect-w-3 aspect-h-2"
              >
                <img
                  className="max-w-full object-contain img w-[400px] h-[500px] "
                  src={image}
                  alt={`Image ${index + 1}`}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
