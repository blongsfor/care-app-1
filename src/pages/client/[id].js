import { useRouter } from "next/router";
import useSWR from "swr";
import Client from "../../components/Client";
import LogoutButton from "../../components/LogoutButton";
import Navbar from "../../components/Navbar";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ClientDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(id ? `/api/clients/${id}` : null, fetcher);

  if (error) return <div>Failed to load client</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div style={styles}>
        <Client {...data} />
      </div>
    </>
  );
}

const styles = {
  marginTop: "80px",
};
