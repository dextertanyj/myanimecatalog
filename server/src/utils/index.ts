import { PrismaClient } from "@prisma/client";
import { BaseContext } from "apollo-server-types/src";
import express from "express";
import * as jwt from "jsonwebtoken";

export interface Context extends BaseContext {
  prisma: PrismaClient;
  userId?: string;
}

export function getContextUserId(req?: express.Request) {
  const Authorization = req?.headers.authorization;
  if (Authorization) {
    const token = Authorization.replace("Token ", "");
    const { userId } = jwt.verify(token, process.env.APP_SECRET ?? "") as {
      userId: string;
    };
    return userId;
  } else {
    return null;
  }
}
