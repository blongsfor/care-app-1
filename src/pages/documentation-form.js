import React, { useState, useEffect } from "react";
import DocumentationForm from "@/components/DocumentationForm";
import Navbar from "../components/Navbar";

export default function DocumentationFormPage() {
  return (
    <>
      <h2 style={styles.header}>Create</h2>
      <DocumentationForm />
    </>
  );
}

const styles = {
  header: {
    textAlign: "center",
    marginTop: "20px",
    color: "white",
  },
};
