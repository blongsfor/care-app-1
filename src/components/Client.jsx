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

  const datestring = new Date(client.dateOfBirth).toLocaleDateString("de-DE"); // formatting nicely

  return (
    <div style={styles.wrapper}>
      <img
        src={client.picture}
        alt={`${client.firstName} ${client.lastName}`}
        style={styles.image}
      />
      <p style={styles.name}>
        <strong>
          {client.firstName} {client.lastName}
        </strong>
      </p>
      <div style={styles.container}>
        <div style={styles.details}>
          <div style={styles.infoBox}>
            <p style={styles.paragraph}>
              <strong>Date of Birth:</strong>
            </p>
            <div style={styles.infoData}>{datestring}</div>
          </div>
          <div style={styles.infoBox}>
            <p style={styles.paragraph}>
              <strong>Place of Birth:</strong>
            </p>
            <div style={styles.infoData}>{client.placeOfBirth}</div>
          </div>
          <div style={styles.infoBox}>
            <p style={styles.paragraph}>
              <strong>Address:</strong>
            </p>
            <div style={styles.infoData}>
              {client.address.street} <br />
              {client.address.zipCode} {client.address.city}
            </div>
          </div>
          <div style={styles.infoBox}>
            <p style={styles.paragraph}>
              <strong>Contact:</strong>
            </p>
            <div style={styles.infoData}>
              {client.contact.telefon} {client.contact.email}
            </div>
          </div>
          <div style={styles.infoBox}>
            <p style={styles.paragraph}>
              <strong>Parents:</strong>
            </p>
            <div style={styles.infoData}>
              {client.additionalInformation.parents}
            </div>
          </div>
          <div style={styles.infoBox}>
            <p style={styles.paragraph}>
              <strong>Legal Representative:</strong>
            </p>
            <div style={styles.infoData}>
              {client.additionalInformation.legalRepresentative}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "3.7vh",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    width: "90%",
    backgroundColor: "rgba(85, 111, 154, 0.6)",
    backdropFilter: "blur(14px)",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "all 0.5s ease-in-out",
    marginTop: "20px",
  },
  image: {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "50%",
    marginBottom: "20px",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  },
  details: {
    textAlign: "center",
    width: "100%",
    maxWidth: "70vw",
    lineHeight: "1.5",
  },
  name: {
    marginBottom: "10px",
    fontSize: "1.5em",
    color: "white",
  },
  infoBox: {
    marginBottom: "20px",
  },
  infoData: {
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "rgba(85, 111, 154, 0.6)",
    marginBottom: "10px",
    transition: "transform 0.2s",
    color: "white",
  },
  paragraph: {
    textAlign: "left",
    marginBottom: "5px",
    color: "white",
  },
};
