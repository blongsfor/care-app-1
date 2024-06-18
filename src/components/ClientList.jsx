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
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  listItem: {
    margin: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "rgba(85, 111, 154, 0.6)",
    transition: "transform 0.2s",
  },
  linkContainer: {
    textAlign: "center",
    textDecoration: "none",
    color: "inherit",
  },
  image: {
    borderRadius: "25%",
  },
  clientName: {
    marginTop: "10px",
    fontSize: "1.2em",
    color: "#fff",
    textDecoration: "none",
  },
};
