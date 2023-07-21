import Link from "next/link";
import React from "react";

export default function ShoppingButton({ title }) {
  return (
    <Link href="/" className="transition-all">
      <span className="button-gradient flex items-center justify-center text-gray-200  py-2 px-5 rounded-[6px]">
        {title}
      </span>
    </Link>
  );
}
