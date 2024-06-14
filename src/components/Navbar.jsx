import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FileText } from "lucide-react";
import { UsersRound } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { SquareCheckBig } from "lucide-react";
import { PencilLine } from "lucide-react";
import { Home } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav>
      <a onClick={() => router.back()}>
        <ChevronLeft />
      </a>
      <Link href="/">
        <Home />
      </Link>
      <Link href="/notes">
        <SquareCheckBig />
      </Link>
      <Link href="/clientlist">
        <UsersRound />
      </Link>
      <Link href="/entries">
        <FileText />
      </Link>
      <Link href="/documentation-form">
        <PencilLine />
      </Link>
    </nav>
  );
}
