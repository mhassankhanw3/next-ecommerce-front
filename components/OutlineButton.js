import Link from "next/link";
import React from "react";

export default function OutlineButton({ title, href }) {
  return (
    <Link
      href={href}
      className="border border-gray-200 bg-transparent hover:bg-[#404040] transition-all py-2 px-6 rounded-lg text-[18px] text-gray-200 "
    >
      {title}
    </Link>
  );
}
