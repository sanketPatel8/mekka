import { useState, useEffect } from "react";

function useLocalStorage() {
  const [Local, setLocal] = useState("");

  useEffect(() => {
    const getLocal = localStorage.getItem("locale");

    setLocal(getLocal);
  }, []);

  return { Local };
}

export default useLocalStorage;
