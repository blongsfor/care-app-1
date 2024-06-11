import React, { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import DateTimePickerValue from "../components/DateTimePicker";
import Categoryelector from "./CategorySelector";
import ClientSelector from "./ClientSelector";

export default function DocumentationForm() {
  const router = useRouter();
  const [documentation, setDocumentation] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newEntry = {
      clientID: selectedClient,
      task: selectedTask,
      datetime: {
        start: startDateTime,
        end: endDateTime,
      },
      details: documentation,
    };

    const response = await fetch("/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    });

    if (response.ok) {
      router.push("/entries");
    } else {
      console.error("Failed to submit documentation");
    }
  };

  return (
    <div>
      <h2>Create Documentation Entry</h2>
      <form onSubmit={handleSubmit}>
        <DateTimePickerValue
          startDateTime={startDateTime}
          setStartDateTime={setStartDateTime}
          endDateTime={endDateTime}
          setEndDateTime={setEndDateTime}
        />
        <Categoryelector setSelectedTask={setSelectedTask} />
        <ClientSelector setSelectedClient={setSelectedClient} />

        <div>
          <label htmlFor="documentation">Documentation</label>
          <textarea
            id="documentation"
            name="documentation"
            rows="15"
            value={documentation}
            onChange={(e) => setDocumentation(e.target.value)}
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
