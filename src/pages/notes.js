import Notes from "../components/Notes";
import Navbar from "@/components/Navbar";

export default function NotesPage() {
  return (
    <>
      <h2 style={styles.header}>Tasks</h2>
      <Notes />
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
