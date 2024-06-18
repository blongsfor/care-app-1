import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  UsersRound,
  ChevronLeft,
  SquareCheckBig,
  Home,
  Menu,
  PencilLine,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
    await router.replace("/login");
  };

  const navbarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: isOpen ? "10%" : "0",
    height: "100%",
    backgroundColor: "#3C5481",
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
        <Link href="/" style={linkStyle} onClick={toggleNavbar}>
          <Home />
        </Link>
        <Link href="/notes" style={linkStyle} onClick={toggleNavbar}>
          <SquareCheckBig />
        </Link>
        <Link href="/clientlist" style={linkStyle} onClick={toggleNavbar}>
          <UsersRound />
        </Link>
        <Link href="/entries" style={linkStyle} onClick={toggleNavbar}>
          <FileText />
        </Link>
        <Link
          href="/documentation-form"
          style={linkStyle}
          onClick={toggleNavbar}
        >
          <PencilLine />
        </Link>
        <Link href={"/login"}>
          <LogOut style={linkStyle} onClick={handleLogout} />
        </Link>
      </nav>
    </div>
  );
}
