import React, { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import DateTimePickerStart from "./DateTimePickerStart";
import DateTimePickerEnd from "./DateTimePickerEnd";
import Categoryelector from "./CategorySelector";
import ClientSelector from "./ClientSelector";

export default function DocumentationForm() {
  const { mutate } = useSWR("/api/entries");

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const entryData = Object.fromEntries(formData);

    const response = await fetch("/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entryData),
    });
    if (response.ok) {
      mutate();
    }
  }

  return (
    <>
      <div>
        <h2>Create Documentation Entry</h2>
        <form onSubmit={handleSubmit}>
          <DateTimePickerStart />
          <DateTimePickerEnd />
          <Categoryelector />
          <ClientSelector />

          <div>
            <label htmlFor="documentation">Documentation</label>
            <textarea
              id="documentation"
              name="documentation"
              rows="15"
            ></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
