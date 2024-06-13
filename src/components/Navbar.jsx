import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/entries">
        <FileText />
      </Link>
      <Link href="/clientlist">Clients</Link>
    </nav>
  );
}
