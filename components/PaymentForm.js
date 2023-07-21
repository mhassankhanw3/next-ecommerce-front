import Link from "next/link";
import React, { useContext } from "react";
import { CartContext } from "../context/Main";
import axios from "axios";
import Header from "../components/Header"

export default function PaymentForm() {
  // const {
  //   name,
  //   setName,
  //   email,
  //   setEmail,
  //   city,
  //   setCity,
  //   postalCode,
  //   setPostalCode,
  //   streetAddress,
  //   setStreetAddress,
  //   country,
  //   setCountry,
  //   cartProducts,
  // } = useContext(CartContext);

  // const goToPayment = async () => {
  //   const response = await axios.post("/api/checkout", {
  //     name,
  //     email,
  //     city,
  //     postalCode,
  //     streetAddress,
  //     country,
  //     cartProducts,
  //   });
  //   if (response?.data?.url) {
  //     window.location = response?.data?.url;
  //   }
  // };

  // if (window.location.href.includes("success")) {
  //   return (
  //     <>
  //       <Header />
  //     </>
  //   );
  // }

  return (
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
      <input type="hidden" name="products" value={cartProducts.join(",")} />
      <button
        onClick={goToPayment}
        className="mt-4 flex items-center justify-center hover:bg-green-900 bg-[#064e3b] transition-all text-gray-200 text-[18px] py-2 px-4 rounded-[10px] cursor-pointer"
      >
        Continue to Payment
      </button>
    </div>
  );
}
