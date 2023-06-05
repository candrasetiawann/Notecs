"use client"
import React from "react";
import { signOut,useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface Props{
  showMenu: boolean
}

const Nav = ({showMenu} : Props) => {
  // const {data:session} = useSession({
  //   required:true,
  //   onUnauthenticated(){
  //     redirect('/components/auth/signin?callbackUrl=/')
  //   }
  // })
  return (
  // nav 
    <nav className={`${showMenu ? '' : 'hidden'} flex flex-col fixed sm:relative top-0 left-0 sm:mt-0 justify-between w-2/4 md:w-1/4 bg-amber-400 min-h-screen`}>
      <div className="p-6"> 
        <h1 className="text-slate-800 font-bold text-xl pt-2">
         {/* { session?.user?.name} */}
        </h1>
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
