import { useRouter } from "next/router";
import React from "react";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button onClick={handleBack} style={backButtonStyle}>
      <ChevronLeft />
    </button>
  );
}

const backButtonStyle = {
  color: "white",
  position: "fixed",
  background: "none",
  border: "none",
  cursor: "pointer",
  zIndex: "1000",
  top: "20px",
  right: "20px",
};
