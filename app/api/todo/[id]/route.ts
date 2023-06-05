import {PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export const GET = async (req:NextRequest,context:{params:{id:string}}) => {
  const id = (Number(context.params.id) || 0)

  const todos = await prisma.nextjs13todo.findFirst({
    where: {id: id}
  })

  return NextResponse.json({todos})
} 

