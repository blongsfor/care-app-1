import React from "react";
import useSWR from "swr";
import DateTimePickerStart from "./DateTimePickerStart";
import DateTimePickerEnd from "./DateTimePickerEnd";
import CategorySelector from "./TaskSelector";
import ClientSelector from "./ClientSelector";
import { useRouter } from "next/router";

export default function DocumentationForm() {
  const { mutate } = useSWR("/api/entries");
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const entryData = {
      clientID: formData.get("clientID"),
      client: formData.get("clientName"),
      documentation: {
        datetimestart: formData.get("meeting-start"),
        datetimeend: formData.get("meeting-end"),
        task: formData.get("task"),
        details: formData.get("documentation"),
      },
    };

    const response = await fetch("/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entryData),
    });

    if (response.ok) {
      mutate();
      router.push("/entries");
    } else {
      console.error("Failed to submit entry:", response);
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <DateTimePickerStart />
        </div>
        <div style={styles.inputGroup}>
          <DateTimePickerEnd />
        </div>
        <div style={styles.inputGroup}>
          <CategorySelector />
        </div>
        <div style={styles.inputGroup}>
          <ClientSelector />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="documentation" style={styles.label}>
            Documentation:
          </label>
          <textarea
            id="documentation"
            name="documentation"
            rows="12"
            required
            style={styles.textarea}
          ></textarea>
        </div>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "20px",
    width: "90%",
    backgroundColor: "rgba(70, 130, 180, 0.6)",
    backdropFilter: "blur(14px)",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "all 0.5s ease-in-out",
    marginTop: "20px",
  },

  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // Align form elements to the left
  },
  inputGroup: {
    marginBottom: "20px",
    width: "100%", // Ensure input groups take full width for better alignment
  },
  label: {
    marginBottom: "10px",
    fontSize: "1em",
    color: "white",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1em",
    marginTop: "5px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1em",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#556f9a",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};
