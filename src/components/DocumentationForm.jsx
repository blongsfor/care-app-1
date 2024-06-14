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
      router.push("/entries"); //automatic redirection to the other entries after submitting, also takes care of form clearing
    } else {
      console.error("Failed to submit entry:", response);
    }
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
          <label htmlFor="documentation">Documentation: </label>
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
