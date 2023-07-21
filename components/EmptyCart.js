import React, { useContext } from "react";
import { CartContext } from "../context/Main";
import Link from "next/link";
import ShoppingButton from "./ShoppingButton";

export default function EmptyCart() {
  const { cartProducts, addProducts, removeProduct, loading, setLoading } =
    useContext(CartContext);
  return (
    <>
      <div className="flex flex-col max-w-[100%] w-[40%] items-center justify-center mx-auto">
        <img
          className="max-w-[100%] w-[150px] m-0 "
          src="https://d5hdtqvs98ocz.cloudfront.net/cdn/add/vector-shopping-cart-icon-paper-sticker-with-shadow-colored-shopping-symbol-isolated_118339-1774-removebg-preview-LE0LqZsf3ZAcGGX.png"
          alt=""
        />
        <h3 className="text-[20px] text-gray-800 font-Ubuntu mb-2 font-semibold flex items-center gap-1 ">
          Your Cart is Empty
        </h3>
        <span>Add something to make us happy :{")"}</span>
        <div className="mt-4 w-[100%]">
          <ShoppingButton title="Return to Shopping" />
        </div>
      </div>
    </>
  );
}
