"use client"
import React from "react";
import { signOut,useSession } from "next-auth/react";
import Image from "next/image";

interface Props{
  showMenu: boolean
}

const Nav = ({showMenu} : Props) => {
  const {data} = useSession()

  return (
  // nav 
    <nav className={`${showMenu ? '' : 'hidden'} flex flex-col fixed sm:relative top-0 left-0 sm:mt-0 justify-between w-2/4 md:w-1/4 bg-amber-400 min-h-screen`}>
      <div className="p-6"> 
        <h6 className="text-slate-800 font-bold text-xl pt-2">
         { data?.user?.name}
        </h6>
        <ul>
          <li className="py-2 text-slate-800">
            <a href="">Daftar</a>
          </li>
          <li className="py-2 text-slate-800">
            <a href="">Pengaturan</a>
          </li>
          <li className="py-2 text-slate-800">
            <button onClick={() => signOut()}>Log Out</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
