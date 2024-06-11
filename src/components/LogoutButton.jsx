import React from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
    router.replace("/login");
  };

  return <button onClick={handleLogout}>Log out</button>;
}
