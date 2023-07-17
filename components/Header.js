import React, { Children, useContext } from "react";
import Link from "next/link";
import { BsFillBagFill, BsHandbagFill } from "react-icons/bs";
import { CartContext } from "../context/Main";
export default function Header() {
  const { cartProducts } = useContext(CartContext);
  return (
    <nav className="bg-[#222] p-[20px] ">
      <div className="flex items-center justify-between max-w-[100%] w-[60%] mx-auto ">
        <Link href={"/"} legacyBehavior>
          <a className="text-white flex items-center gap-2 font-bold font-poppins ">
            <BsFillBagFill className="text-[18px]" /> NextSTORE
          </a>
        </Link>
        <ul className="flex items-center gap-[20px] ">
          <List title={"Home"} href={"/"} />
          <List title={"All products"} href={"/products"} />
          <List title={"Categories"} href={"/categories"} />
          <List title={"Account"} href={"/account"} />
          <List title={`Cart (${cartProducts.length})`} href={"/cart"} />
        </ul>
      </div>
    </nav>
  );
}

export function List({ title, href }) {
  return (
    <li className={styles.list}>
      <Link href={href} legacyBehavior>
        {title}
      </Link>
    </li>
  );
}

const styles = {
  list: "text-gray-300 hover:text-gray-100",
};
