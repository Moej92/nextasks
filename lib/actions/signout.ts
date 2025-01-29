"use server";

import { signOut as nextSignOut } from "@/auth";

export async function signOutAction() {
  await nextSignOut({ redirectTo: "/auth/sign-in"});
}