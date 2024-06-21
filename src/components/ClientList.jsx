import Image from "next/image";
import Link from "next/link";

export default function ClientList({ clients }) {
  return (
    <ul style={styles.list}>
      {clients.map((client) => (
        <li key={client._id} style={styles.listItem}>
          <Link href={`/client/${client._id}`}>
            <div style={styles.linkContainer}>
              <Image
                src={client.picture}
                width={200}
                height={200}
                alt={client.firstName}
                style={styles.image}
              />
              <h2 style={styles.clientName}>
                {client.firstName} {client.lastName}
              </h2>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

const styles = {
  list: {
    listStyle: "none",
    padding: "0 20px",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    justifyContent: "center",
    marginTop: "20px",
    maxWidth: "100%",
  },
  listItem: {
    paddingTop: "10px",
    borderRadius: "8px",
    backgroundColor: "rgba(70, 130, 180, 0.4)",
    transition: "transform 0.2s",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    width: "100%",
  },
  linkContainer: {
    textAlign: "center",
    textDecoration: "none",
    color: "inherit",
    display: "block",
  },
  image: {
    width: "135px",
    height: "135px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  },
  clientName: {
    marginTop: "5px",
    marginBottom: "10px",
    fontSize: "1.2em",
    color: "#fff",
    textDecoration: "none",
  },
};
