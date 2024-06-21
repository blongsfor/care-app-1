import useSWR from "swr";
import React from "react";
import ClientList from "../components/ClientList";
import LogoutButton from "../components/LogoutButton";
import Navbar from "../components/Navbar";

export default function Homepage() {
  const { data, error } = useSWR("/api/clients");

  if (error) return <div>Failed to load clients</div>;
  if (!data) return <div>Loading...</div>;
  console.log("data", data);

  return (
    <div style={styles.div}>
      <h2 style={styles.header}></h2>
      <ClientList clients={data} />
    </div>
  );
}

const styles = {
  header: {
    textAlign: "center",
    marginTop: "20px",
    color: "white",
  },
  div: {
    marginTop: "60px",
  },
};
