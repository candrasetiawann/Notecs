import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string) =>{
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where:{
      email:email
    }
  })
  return user
}