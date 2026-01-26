"use client";

import { signIn, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

type SignInButtonProps = {
  label: string;
  callbackUrl: string;
};

type SignOutButtonProps = {
  label: string;
};

export function SignInButton({ label, callbackUrl }: SignInButtonProps) {
  return (
    <Button
      type="button"
      onClick={() => signIn("github", { callbackUrl })}
    >
      {label}
    </Button>
  );
}

export function SignOutButton({ label }: SignOutButtonProps) {
  return (
    <Button type="button" variant="outline" onClick={() => signOut()}>
      {label}
    </Button>
  );
}
