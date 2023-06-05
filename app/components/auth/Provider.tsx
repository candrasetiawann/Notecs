"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

export const Provider = ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
