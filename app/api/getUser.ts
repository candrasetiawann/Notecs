import prisma from "./prisma";
// const prisma = new PrismaClient();


export const findUserByEmail = async (email: string) =>{
  const user = await prisma.user.findUnique({
    where:{
      email:email
    }
  })
  return user
}

export const getUser = async (email: string) => {
  const user = await findUserByEmail(email);
  return user;
};
