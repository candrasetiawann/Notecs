"use client";
import React, { useState } from "react";
import Nav from "./Nav";

const MenuController = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Nav showMenu={showMenu} />
      {/* <button className="block ml-auto pr-3 pt-2 sticky top-0 z-10"> */}
      <button className="fixed pt-2 right-0 mr-2 top-0 z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 "
          onClick={() => setShowMenu(!showMenu)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </button>
    </>
  );
};

export default MenuController;
