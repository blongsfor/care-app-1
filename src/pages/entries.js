import useSWR from "swr";
import EntryList from "../components/EntryList";
import Navbar from "../components/Navbar";

export default function Entries() {
  const { data, error } = useSWR("/api/entries");

  if (error) return <div>Failed to load entries</div>;
  if (!data) return <div>Loading...</div>;

  // const headlineStyle = {
  //   marginTop: "70px",
  //   marginBottom: "20px",
  // };

  return (
    <>
      <div>
        <Navbar />
        <h2>Documentation</h2>
        <EntryList entries={data} />
      </div>
    </>
  );
}
