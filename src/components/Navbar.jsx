import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/entries">Entries</Link>
        </li>
        <li>
          <Link href="/clientlist">Clients</Link>
        </li>
      </ul>
    </nav>
  );
}
