import Navbar from "./Navbar";
import BackButton from "./BackButton";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  // Function to get the page title based on the route
  const getPageTitle = () => {
    switch (router.pathname) {
      case "/":
        return "TakeCare";
      case "/notes":
        return "Tasks";
      case "/clientlist":
        return "Clients";
      case "/entries":
        return "Entries";
      case "/documentation-form":
        return "Create";
      case "/login":
        return "Login";
      default:
        return "Client Profile";
    }
  };

  return (
    <div style={headerStyle}>
      <Navbar />
      <h2 style={h2Style}>{getPageTitle()}</h2>
      <BackButton />
    </div>
  );
}
const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "rgba(85, 111, 154, 0.6)",
  //   backdropFilter: "blur(10px)",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  padding: "15px",
  zIndex: "1000",
  borderBottomRightRadius: "20px",
  borderBottomLeftRadius: "20px",
  //   minHeight: "60px",
};

const h2Style = {
  color: "white",
  margin: 0,
  color: "white",
  margin: 0,
  flex: 1, // Allows the h2 element to take up remaining space
  textAlign: "center",
};
