import useSWR from "swr";
import { useRouter } from "next/router";

export default function Client() {
  const router = useRouter();
  const { id } = router.query;

  const { data: client, error } = useSWR(`/api/clients/${id}`);

  if (!client && !error) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return <h1>Error loading client data</h1>;
  }

  if (!client) {
    return <h1>Client data not available</h1>;
  }
  const datestring = new Date(client.dateOfBirth).toLocaleDateString("de-DE"); //formatting nicely

  return (
    <div style={styles.container}>
      <img
        src={client.picture}
        alt={`${client.firstName} ${client.lastName}`}
        style={styles.image}
      />
      <div style={styles.details}>
        <p>
          <strong>Name:</strong> {client.firstName} {client.lastName}
        </p>
        <p>
          <strong>Date of Birth: </strong>
          {datestring}
        </p>
        <p>
          <strong>Place of Birth:</strong> {client.placeOfBirth}
        </p>
        <p>
          <strong>Address: </strong> {client.address.street},{" "}
          {client.address.city}, {client.address.zipCode}
        </p>
        <p>
          <strong>Contact: </strong> {client.contact.telefon},{" "}
          {client.contact.email}
        </p>
        <p>
          <strong>Parents: </strong> {client.additionalInformation.parents}
        </p>
        <p>
          <strong>Legal Representative: </strong>
          {client.additionalInformation.legalRepresentative}
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    maxWidth: "80vw",
    margin: "auto",
    marginTop: "15vh",
    backgroundColor: "rgba(85, 111, 154, 0.6)", // Semi-transparent background color
  },
  image: {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "50%",
    marginBottom: "20px",
  },
  details: {
    textAlign: "left",
    width: "100%",
    maxWidth: "70vw",
    lineHeight: "1.5",
  },
};
