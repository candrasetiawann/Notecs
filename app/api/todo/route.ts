// import { PrismaClient } from "@prisma/client";
// import { NextRequest, NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export const GET = async (req: NextRequest) => {
//   const todos = await prisma.nextjs13todo.findMany({});
//   return NextResponse.json({ todos });
// };

// export const POST = async (req: NextRequest) => {
//   const { title, content } = await req.json();

//   const todos = await prisma.nextjs13todo.create({
//     data: {
//       title,
//       content,
//     },
//   });
//   return NextResponse.json({ todos });
// };

// export const DELETE = async (req: NextRequest) => {
//   const url = new URL(req.url).searchParams;
//   const id = Number(url.get("id")) || 0;
//   console.log("id" + id);

//   const todos = await prisma.nextjs13todo.delete({
//     where: {
//       id: id,
//     },
//   });

//   if (!todos) {
//     return NextResponse.json({ message: "error" }, { status: 500 });
//   }
//   return NextResponse.json({ message: "ok" }, { status: 200 });
// };

// export const PUT = async (req: NextRequest) => {
//   const { id, title, content } = await req.json();

//   const todos = await prisma.nextjs13todo.update({
//     where: {
//       id: Number(id),
//     },
//     data: {
//       title,
//       content,
//     },
//   });
//   return NextResponse.json({ todos });
// };

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  if (user === null) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const todos = await prisma.nextjs13todo.findMany({
    where: {
      authorId: user.id,
    },
  });
  return NextResponse.json({ todos });
};


//POST

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? "" }, // Ubah sesuai dengan cara Anda mengidentifikasi pengguna
  });

  if (!user) {
    throw new Error("User ID is missing");
  }
  const { title, content, author } = await req.json();
  console.log(title, content, author);

  const todos = await prisma.nextjs13todo.create({
    data: {
      title,
      content,
      authorId: user?.id,
    },
  });
  return NextResponse.json({ todos });
};


//DELETE

export const DELETE = async (req: NextRequest) => {
  const url = new URL(req.url).searchParams;
  const id = Number(url.get("id")) || 0;
  console.log("id" + id);

  const todos = await prisma.nextjs13todo.delete({
    where: {
      id: id,
    },
  });

  if (!todos) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
  return NextResponse.json({ message: "ok" }, { status: 200 });
};


//PUT

export const PUT = async (req: NextRequest) => {
  const { id, title, content } = await req.json();

  const todos = await prisma.nextjs13todo.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      content,
    },
  });
  return NextResponse.json({ todos });
};
