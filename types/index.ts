import { User } from "@prisma/client";

// "createdAt", "updatedAt" and "emailVerified" fields are stored as Date objects, but we format Date objects to string representations. (Omit function doesn't change data type in database)
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
