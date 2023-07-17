import React, { useContext, useEffect } from "react";
import { BiSolidCart } from "react-icons/bi";
import { CartContext } from "../context/Main";
import Link from "next/link";

export default function LatestProducts({ products }) {
  const { addProducts } = useContext(CartContext);
  const url = "/product/" + products?._id;

  // useEffect(() => {
  //   console.log(product, "product");
  // }, []);

  return (
    <div className="mt-20 mb-60 max-w-[100%] w-[50%] mx-auto ">
      <h2 className="text-[34px] font-Ubuntu text-zinc-800 font-medium ml-4">
        Latest Products
      </h2>
      <div className="grid grid-cols-4 ">
        {products &&
          products.map((i) => {
            return (
              <div key={i._id} className="max-w-[100%] w-[200px] mx-auto my-4 ">
                <Link href={url} legacyBehavior>
                  <div className="h-[150px] max-w-[100%] w-[200px] px-[20px] white_box shadow flex items-center justify-center bg-white rounded-lg">
                    <img
                      src={i.images[0]}
                      className="max-w-[100%] max-h-[100px] object-contain"
                      alt="Loading"
                    />
                  </div>
                </Link>
                <div className="my-1">
                  <h3 className="text-[18px] font-medium">{i.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-gray-700 font-poppins text-[18px] mt-0">
                      ${i.price}
                    </span>
                    <button
                      onClick={() => addProducts(i?._id)}
                      className="text-[#064e3b] hover:bg-[#064e3b] hover:text-gray-200 hover:fill-gray-200 transition-all flex items-center gap-1 border border-[#064e3b] py-1 px-2 rounded-md"
                    >
                      <BiSolidCart className="text-[20px] solid text-[#064e3b] mr-[2px]" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
