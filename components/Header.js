import React, { Children, useContext } from "react";
import Link from "next/link";
import { BsCart4, BsFillBagFill, BsHandbagFill } from "react-icons/bs";
import { CartContext } from "../context/Main";
import { Badge } from "antd";
export default function Header() {
  const { cartProducts } = useContext(CartContext);
  return (
    <nav className="bg-[#222] py-[30px] px-[20px] fixed w-full top-0 z-50 ">
      <div className="flex items-center justify-between max-w-[100%] w-[60%] mx-auto">
        <Link href={"/"} legacyBehavior>
          <a className="text-white flex items-center gap-2 font-bold font-poppins">
            <BsFillBagFill className="text-[18px]" /> NextSTORE
          </a>
        </Link>
        <ul className="flex items-center gap-[20px] ">
          <List title={"Home"} href={"/"} />
          <List title={"All products"} href={"/products"} />
          <List title={"Categories"} href={"/categories"} />
          <List title={"Account"} href={"/account"} />
          <List
            iconCart={
              <Badge
                count={cartProducts.length}
                overflowCount={9}
                size="small"
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "black",
                  position: "absolute",
                  border: "none",
                  outline: "none",
                  // left: "10px",
                }}
              >
                <BsCart4
                  color="#d1d5db"
                  style={{ cursor: "pointer", marginTop: "-4px" }}
                  fontSize={23}
                />
              </Badge>
            }
            title={`Cart`}
            href={"/cart"}
          />
        </ul>
      </div>
    </nav>
  );
}

export function List({ title, href, iconCart }) {
  return (
    <li className={styles.list}>
      <Link href={href} legacyBehavior>
        <span className="flex items-start gap-1">
          {title}
          {iconCart}
        </span>
      </Link>
    </li>
  );
}

const styles = {
  list: "text-gray-300 hover:text-gray-100 cursor-pointer ",
};
