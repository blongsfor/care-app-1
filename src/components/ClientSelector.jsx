import React from "react";
import useSWR from "swr";

export default function ClientSelector({ setClientID }) {
  const { data: clients = [], error } = useSWR(`/api/clients`);

  if (error) return <h1>Error loading client data</h1>;
  if (!clients) return <h1>Loading ...</h1>;

  const handleClientChange = (event) => {
    setClientID(event.target.value);
  };

  return (
    <div>
      <label htmlFor="client">Client</label>
      <select id="client" name="client" onChange={handleClientChange}>
        <option value="">Select Client</option>
        {clients.map((client) => (
          <option key={client.id} value={client.clientID}>
            {client.firstName} {client.lastName}
          </option>
        ))}
      </select>
    </div>
  );
}
