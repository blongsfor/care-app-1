import useSWR from "swr";
import EntryList from "../components/EntryList";
import LogoutButton from "@/components/LogoutButton";
import DocumentButton from "@/components/DocumentButton";
import Navbar from "../components/Navbar";

export default function Entries() {
  const { data, error } = useSWR("/api/entries");

  if (error) return <div>Failed to load entries</div>;
  if (!data) return <div>Loading...</div>;

  //console.log("here should be data:", data);

  return (
    <>
      <Navbar />
      <LogoutButton />

      <div>
        <h2>Documentation</h2>
        <EntryList entries={data} />
      </div>
    </>
  );
}
