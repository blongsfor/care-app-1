import useSWR from "swr";
import EntryList from "../components/EntryList";
import BackButton from "@/components/BackButton";
import LogoutButton from "@/components/LogoutButton";
import DocumentButton from "@/components/DocumentButton";

export default function Entries() {
  const { data, error } = useSWR("/api/entries");

  if (error) return <div>Failed to load entries</div>;
  if (!data) return <div>Loading...</div>;

  console.log("here should be data somehow:", data);

  return (
    <>
      <LogoutButton />
      <DocumentButton />
      <div>
        <h2>Entries</h2>
        <EntryList entries={data} />
      </div>
    </>
  );
}
