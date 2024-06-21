import useSWR from "swr";
import EntryList from "../components/EntryList";
import Navbar from "../components/Navbar";

export default function Entries() {
  const { data, error, mutate } = useSWR("/api/entries");

  if (error) return <div>Failed to load entries</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div>
        <h2 style={styles.header}></h2>
        <EntryList entries={data} onUpdate={mutate} onDelete={mutate} />
      </div>
    </>
  );
}

const styles = {
  header: {
    textAlign: "center",
    marginTop: "20px",
    color: "white",
  },
};
