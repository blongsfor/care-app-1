import Image from "next/image";
import Link from "next/link";

export default function ClientList({ clients }) {
  return (
    <ul>
      {clients.map((client) => (
        <li key={client._id}>
          <Link href={`/client/${client._id}`}>
            <Image src={client.picture} width={200} height={200} />
            <h2>
              {client.firstName} {client.lastName}
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}
