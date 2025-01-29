import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

import connectToDB from "./lib/mongoose"
import User from "@/lib/models/user.models";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
})