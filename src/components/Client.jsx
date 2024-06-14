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
    <div>
      <img
        src={client.picture}
        alt={`${client.firstName} ${client.lastName}`}
      />

      <p>Date of Birth: {datestring}</p>
      <p>Place of Birth: {client.placeOfBirth}</p>
      <p>
        Address: {client.address.street}, {client.address.city},{" "}
        {client.address.zipCode}
      </p>
      <p>
        Contact: {client.contact.telefon}, {client.contact.email}
      </p>
      <p>Parents: {client.additionalInformation.parents}</p>
      <p>
        Legal Representative: {client.additionalInformation.legalRepresentative}
      </p>
    </div>
  );
}
