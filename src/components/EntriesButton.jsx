// component not in use anymore, possibly later
import { useRouter } from "next/router";
import React from "react";

const EntriesButton = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/entries");
  };

  return <button onClick={handleRedirect}>Go To Documentation Entries</button>;
};

export default EntriesButton;
