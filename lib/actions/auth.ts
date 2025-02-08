"use server";

import { signOut as nextSignOut, signIn as nextSignIn } from "@/auth";

export async function signOutAction() {
  await nextSignOut({ redirectTo: "/auth/sign-in"});
}

export async function signInAction(provider: string) {
  await nextSignIn(provider, { redirectTo: "/" });
}