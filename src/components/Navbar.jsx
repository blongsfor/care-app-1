// import React from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { FileText } from "lucide-react";
// import { UsersRound } from "lucide-react";
// import { ChevronLeft } from "lucide-react";
// import { SquareCheckBig } from "lucide-react";
// import { Home } from "lucide-react";

// export default function Navbar() {
//   const router = useRouter();
//   return (
//     <nav>
//       <a onClick={() => router.back()}>
//         <ChevronLeft />
//       </a>
//       <Link href="/">
//         <Home />
//       </Link>
//       <Link href="/notes">
//         <SquareCheckBig />
//       </Link>
//       <Link href="/clientlist">
//         <UsersRound />
//       </Link>
//       <Link href="/entries">
//         <FileText />
//       </Link>
//     </nav>
//   );
// }

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FileText,
  UsersRound,
  ChevronLeft,
  SquareCheckBig,
  Home,
  Menu,
} from "lucide-react";
import LogoutButton from "./LogoutButton";
import DocumentButton from "./DocumentButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navbarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: isOpen ? "250px" : "0",
    height: "100%",
    backgroundColor: "#333",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflowX: "hidden",
    transition: "width 0.5s ease-in-out",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    margin: "20px 0",
    cursor: "pointer",
  };

  const burgerButtonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    position: "fixed",
    top: "20px",
    left: "20px",
    zIndex: 1000,
  };

  return (
    <div>
      <button style={burgerButtonStyle} onClick={toggleNavbar}>
        <Menu />
      </button>
      <nav style={navbarStyle}>
        <Link href="/" style={linkStyle}>
          <Home />
        </Link>
        <Link href="/notes" style={linkStyle}>
          <SquareCheckBig />
        </Link>
        <Link href="/clientlist" style={linkStyle}>
          <UsersRound />
        </Link>
        <Link href="/entries" style={linkStyle}>
          <FileText />
        </Link>
        <Link href="/documentation-form" style={linkStyle}>
          <DocumentButton />
        </Link>

        <LogoutButton />
      </nav>
    </div>
  );
}
