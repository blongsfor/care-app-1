import BackButton from "@/components/BackButton";
import React, { useState, useEffect } from "react";
import DocumentationForm from "@/components/DocumentationForm";
import Navbar from "../components/Navbar";

export default function DocumentationFormPage() {
  return (
    <>
      <Navbar />
      <DocumentationForm />
    </>
  );
}
