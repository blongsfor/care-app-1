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
    <div>
      <label htmlFor="client">Client</label>
      <select
        id="client"
        name="clientID"
        value={selectedClient}
        onChange={handleClientChange}
        required
      >
        <option value="">Select Client</option>
        {clients?.map((client) => (
          <option key={client._id} value={client._id}>
            {client.firstName} {client.lastName}
          </option>
        ))}
      </select>
      <input
        type="hidden"
        name="clientName"
        value={
          clients.find((client) => client._id === selectedClient)?.firstName +
            " " +
            clients.find((client) => client._id === selectedClient)?.lastName ||
          ""
        }
      />
    </div>
  );
}
