import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { CartContext } from "../../context/Main";
import Link from "next/link";
import { AiOutlineWarning } from "react-icons/ai";
import { Spin } from "antd";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const { cartProducts, addProducts, removeProduct } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (cartProducts?.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data, "response.data");
        setLoading(false);
      });
    }
  }, [cartProducts]);

  const increamentProduct = (id) => {
    addProducts(id);
  };
  const decreamentProduct = (id) => {
    removeProduct(id);
  };

  let total = 0;
  for (const productId of cartProducts) {
    const price = products?.find((p) => p?._id === productId)?.price || 0;
    total += price;
  }

  return (
    <>
      <Header />
      <div className="grid grid-cols-3 gap-[40px] mt-[100px] mx-auto max-w-[100%] w-[70%]">
        <div
          className={`bg-white shadow col-span-3 sm:col-span-2 rounded-[10px] py-[30px] px-[20px] `}
        >
          <h2 className="text-[24px] font-semibold mb-[20px] ">Cart</h2>
          {!cartProducts?.length < 0 && (
            <>
              <h3 className="text-[20px] text-gray-800 flex items-center gap-1 ">
                <AiOutlineWarning className="text-red-800 text-[28px] " /> Your
                Cart is empty!
              </h3>
            </>
          )}
          {products?.length > 0 && (
            <>
              <table className="max-w-[100%] w-[100%] ">
                <thead className="mb-10">
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product) => (
                    <tr key={product?._id}>
                      <td>
                        <div className="my-2">
                          <div className=" w-[120px] h-[120px] rounded-[10px] flex items-center justify-center border p-[10px] border-gray-300 ">
                            <img
                              className="max-w-[80px] max-h-[80px] "
                              src={product?.images[0]}
                              alt=""
                            />
                          </div>
                          {product.title}:{" "}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-4">
                          <button
                            className="default-btn"
                            onClick={() => decreamentProduct(product?._id)}
                          >
                            -
                          </button>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                          <button
                            className="default-btn"
                            onClick={() => increamentProduct(product?._id)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * product?.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <div className="flex items-center">
                        <span>Total:</span>
                        <span className="font-bold text-[18px] ml-[10px] ">
                          ${total}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
          {loading && (
            <Spin
              className="flex items-center justify-center mx-auto"
              size="large"
            />
          )}
        </div>
        {!!cartProducts?.length && (
          <div className="bg-white shadow col-span-3 sm:col-span-1 rounded-[10px] py-[40px] px-[20px]">
            <h2 className="text-[28px] font-bold ">Order Information</h2>
            <Link href={"/"} legacyBehavior>
              <span className="mt-4 flex items-center justify-center hover:bg-green-900 bg-[#064e3b] transition-all text-gray-200 text-[18px] py-2 px-4 rounded-[10px] cursor-pointer ">
                Continue to Payment
              </span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
