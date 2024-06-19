import React, { useState } from "react";
import useSWR from "swr";

export default function ClientSelector() {
  const [selectedClient, setSelectedClient] = useState("");

  const { data: clients = [], error } = useSWR(`/api/clients`); //we need an empty array here in case data is undefined and the client data is an array of objs

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
    <div style={styles.container}>
      <label htmlFor="client" style={styles.label}>
        Client:
      </label>
      <select
        id="client"
        name="clientID"
        value={selectedClient}
        onChange={handleClientChange}
        required
        style={styles.select}
      >
        <option value="">Select Client</option>
        {clients?.map((client) => (
          <option key={client._id} value={client._id}>
            {client.firstName} {client.lastName}
          </option> // maps through clients and returns the name + last name in the selector
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
        } // checks if the client you select matches client from DB via id
      />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  },
  label: {
    marginRight: "10px",
    fontSize: "1em",
    color: "white",
    width: "30%",
    textAlign: "left",
  },
  select: {
    width: "70%",
    padding: "3px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    textAlign: "center",
  },
};
