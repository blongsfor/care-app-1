import React, { useState } from "react";
import useSWR from "swr";

export default function ClientSelector() {
  const [selectedClient, setSelectedClient] = useState("");

  const { data: clients = [], error } = useSWR(`/api/clients`);

  if (!clients && !error) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return <h1>Error loading client data</h1>;
  }

  if (!clients) {
    return <h1>Client data not available</h1>;
  }

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  return (
    <>
      <div>
        <label htmlFor="title">Client</label>
        <select
          id="title"
          name="title"
          value={selectedClient}
          onChange={handleClientChange}
        >
          <option value="">Select Title</option>
          {clients?.map((client) => (
            <option key={client.id} value={client.lastName}>
              {client.firstName} {client.lastName}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
