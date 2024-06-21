import Notes from "../components/Notes";
import Navbar from "@/components/Navbar";

export default function NotesPage() {
  return (
    <>
      <div style={styles.div}>
        <h2 style={styles.header}></h2>
        <Notes />
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
  div: {
    marginTop: "80px",
  },
};
