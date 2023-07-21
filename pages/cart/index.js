import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { CartContext } from "../../context/Main";
import Link from "next/link";
import { AiOutlineWarning } from "react-icons/ai";
import { Spin } from "antd";
import PaymentForm from "../../components/PaymentForm";
import EmptyCart from "../../components/EmptyCart";
import ShoppingButton from "../../components/ShoppingButton";
// import classNames from "classnames";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const {
    cartProducts,
    addProducts,
    removeProduct,
    loading,
    setLoading,
    clearCarts,
    setCartProducts,
  } = useContext(CartContext);

  useEffect(() => {
    if (cartProducts.length > 0) {
      setLoading(true);
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data, "response.data");
        setLoading(false);
      });
    } else {
      setProducts([]);
      setCartProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCarts();
    }
  }, []);

  const increamentProduct = (id) => {
    addProducts(id);
  };
  const decreamentProduct = (id) => {
    removeProduct(id);
  };

  let total = 0;
  for (const productId of cartProducts) {
    const price = products?.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  const goToPayment = async () => {
    setIsProcessingPayment(true);
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
    setIsProcessingPayment(false);
  };

  if (isSuccess) {
    return (
      <>
        <Header />
        <div className="mt-[150px] max-w-[100%] w-[60%] flex flex-col justify-start mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-[100%] w-[50%] ">
            <h1 className="text-gray-900 font-bold text-3xl mb-6 flex items-center gap-1 ">
              Thanks for your order! <span className="text-[24px]">😊</span>
            </h1>
            <p className="text-gray-700 text-lg">
              We will email you when your order is on its way.
            </p>
            <div className="mt-2">
              <ShoppingButton title="Continue to Shopping" />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="grid grid-cols-3 gap-[40px] mt-[150px] mx-auto max-w-[100%] w-[70%]">
        <div
          className={`${
            !cartProducts?.length > 0
              ? "bg-white  mx-auto w-[70%] max-w-[100%] rounded-[10px] shadow py-[30px] px-[20px] flex flex-col col-span-4"
              : "bg-white w-[100%] max-w-[100%] shadow col-span-3 sm:col-span-2 rounded-[10px] py-[30px] px-[20px] "
          } `}
        >
          <h2 className="text-[24px] font-semibold mb-[10px] ">Cart</h2>
          {!cartProducts?.length > 0 && <EmptyCart />}
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
          <div className="bg-white flex flex-col gap-[10px] shadow col-span-3 sm:col-span-1 rounded-[10px] py-[40px] px-[20px]">
            <h2 className="text-[28px] font-bold">Order Information</h2>
            <input
              className="input"
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center gap-2 max-w-[100%] w-[100%]">
              <input
                className="border max-w-[100%] w-[50%] border-gray-300 rounded-[6px] py-1 px-2 focus:border focus:border-blue-600  focus:outline-none"
                type="text"
                placeholder="City"
                value={city}
                name="city"
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                className="border max-w-[100%] w-[50%] border-gray-300 rounded-[6px] py-1 px-2 focus:border focus:border-blue-600  focus:outline-none"
                type="number"
                placeholder="Postal Code"
                value={postalCode}
                name="postalCode"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <input
              type="text"
              className="input"
              placeholder="Street Address"
              value={streetAddress}
              name="streetAddress"
              onChange={(e) => setStreetAddress(e.target.value)}
            />
            <input
              type="text"
              className="input"
              placeholder="Country"
              value={country}
              name="country"
              onChange={(e) => setCountry(e.target.value)}
            />
            <input
              type="hidden"
              name="products"
              value={cartProducts.join(",")}
            />
            <button
              onClick={goToPayment}
              disabled={isProcessingPayment}
              className={`${
                isProcessingPayment && "custom-disabled-button"
              } custom-loading-button mt-4 flex items-center justify-center hover:bg-green-900 bg-[#064e3b] transition-all text-gray-200 text-[18px] py-2 px-4 rounded-[10px] cursor-pointer`}
            >
              {isProcessingPayment ? (
                <span className="custom-loading-button">
                  <span>Loading...</span>
                  <div className="loader"></div>
                </span>
              ) : (
                "Continue to Payment"
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
