import React from "react";

export default function SolidButton({ title, icon, clickFunc }) {
  return (
    <>
      <button
        onClick={clickFunc}
        className="bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-all text-gray-700 text-[18px] px-6 py-2 rounded-lg "
      >
        {icon}
        {title}
      </button>
    </>
  );
}
