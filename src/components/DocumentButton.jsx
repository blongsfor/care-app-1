// planning not to use this component anymore since we switched to navbar navigation but let's see
import { useRouter } from "next/router";
import React from "react";

const DocumentButton = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/documentation-form");
  };

  return <button onClick={handleRedirect}>Create Documentation</button>;
};

export default DocumentButton;
