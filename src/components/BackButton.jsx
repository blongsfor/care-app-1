import { useRouter } from "next/router";
import React from "react";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button onClick={handleBack}>
      <ChevronLeft />
    </button>
  );
}
