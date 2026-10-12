"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { z } from "zod";

export async function getUsers(pageParam = "1", limitParam = "6") {
  const page = Number(pageParam);
  const limit = Number(limitParam);

  if (
    !Number.isSafeInteger(page) ||
    !Number.isSafeInteger(limit) ||
    page < 1 ||
    limit < 1 ||
    limit > 100
  ) {
    throw new Error("Invalid page or limit.");
  }

  return prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      City: true,
      updatedAt: true,
    },
  });
}
export async function createUser(name: string, email: string, City: string) {
  try {
    return await prisma.user.create({
      data: { name, email, City },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("A user with this email already exists.");
    }

    throw error;
  }
}
export async function updateUser(
  id: number,
  name: string,
  email: string,
  City: string,
) {
  try {
    return await prisma.user.update({
      where: { id },
      data: { name, email, City, updatedAt: new Date() },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("A user with this email already exists.");
    }

    throw error;
  }
}

export async function deleteUser(email: string) {
  try {
    return await prisma.user.delete({
      where: {
        email,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("No user exists with this email.");
    }

    throw error;
  }
}

export async function createPostForUser(
  userId: number,
  title: string,
  content: string,
  published: boolean,
) {
  const schema = z.object({
    title: z.string().min(2),
    content: z.string().optional(),
    published: z.boolean(),
    authorId: z.number().int().positive(),
  });
  const parsedData = schema.safeParse({
    title,
    content,
    published,
    authorId: userId,
  });

  if (!parsedData.success) {
    console.error(
      "createPostForUser validation failed:",
      parsedData.error.flatten(),
    );
    const details = parsedData.error.issues
      .map((issue) => `${issue.path.join(".") || "post"}: ${issue.message}`)
      .join("; ");
    throw new Error(details);
  }

  console.debug("createPostForUser validation succeeded");
  try {
    return await prisma.post.create({
      data: parsedData.data,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = error.meta?.target;
      const fields = Array.isArray(target)
        ? target.join(", ")
        : String(target ?? "a unique field");
      throw new Error(`Duplicate value for ${fields}.`);
    }

    throw error;
  }
}

export async function getPostsByUserId(userId: number) {
  return prisma.post.findMany({
    where: { authorId: userId },
  });
}
