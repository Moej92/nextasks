import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

import connectToDB from "./lib/mongoose"
import User from "@/lib/models/user.models";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async jwt({ token, user }) {
      if(user) {
        await connectToDB();
        const userDoc = await User.findOne({ email: user.email });
        if(!userDoc) {
          const newUser = new User({
            name: user.name,
            email: user.email,
            image: user.image
          });
          await newUser.save();
          token.id = newUser._id.toString();
        } else {
          token.id = userDoc._id.toString();
        }
      }
      return token;
    },
    async session({ session, token }) {
      if(typeof token.id === "string") {
          session.user.id = token.id;
      }
  
      return session
    }
  },
  
})