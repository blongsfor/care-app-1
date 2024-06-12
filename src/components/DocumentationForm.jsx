import React from "react";
import useSWR from "swr";
import DateTimePickerStart from "./DateTimePickerStart";
import DateTimePickerEnd from "./DateTimePickerEnd";
import CategorySelector from "./CategorySelector";
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
        datetime: formData.get("meeting-start"),
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
    } else {
      const errorData = await response.json();
      console.error("Failed to submit entry:", errorData);
    }
    router.push("/entries");
    router.reload();
  }

  return (
    <div>
      <h2>Create Documentation Entry</h2>
      <form onSubmit={handleSubmit}>
        <DateTimePickerStart />
        <DateTimePickerEnd />
        <CategorySelector />
        <ClientSelector />

        <div>
          <label htmlFor="documentation">Documentation</label>
          <textarea
            id="documentation"
            name="documentation"
            rows="15"
            required
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
