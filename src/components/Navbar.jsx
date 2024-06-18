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
    width: isOpen ? "45%" : "0",
    height: "100%",
    backgroundColor: "rgba(85, 111, 154, 0.6)", // Semi-transparent background color
    backdropFilter: "blur(14px)", // Blurring effect
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    overflowX: "hidden",
    transition: "width 0.5s ease-in-out",
    paddingTop: "60px", // Added padding to avoid overlap with the button
    borderTopRightRadius: "20px", // Rounded corner on the top right
    borderBottomRightRadius: "20px",
    zIndex: "999",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    margin: "20px 0",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  };

  const iconStyle = {
    marginRight: "10px",
  };

  const burgerButtonStyle = {
    color: "white",
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
          <Home style={iconStyle} /> Home
        </Link>
        <Link href="/notes" style={linkStyle} onClick={toggleNavbar}>
          <SquareCheckBig style={iconStyle} /> Tasks
        </Link>
        <Link href="/clientlist" style={linkStyle} onClick={toggleNavbar}>
          <UsersRound style={iconStyle} /> Clients
        </Link>
        <Link href="/entries" style={linkStyle} onClick={toggleNavbar}>
          <FileText style={iconStyle} /> Entries
        </Link>
        <Link
          href="/documentation-form"
          style={linkStyle}
          onClick={toggleNavbar}
        >
          <PencilLine style={iconStyle} /> Create
        </Link>
        <Link href={"/login"} style={linkStyle} onClick={handleLogout}>
          <LogOut style={iconStyle} /> Logout
        </Link>
      </nav>
    </div>
  );
}
