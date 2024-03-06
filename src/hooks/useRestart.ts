import { useCallback, useState } from "react";

function useRestart() {
  const [state, setState] = useState<string>("#5345^&%");

  const restart = useCallback(() => {
    setState((prev) => (prev === "#5345^&%" ? "#5345^" : "#5345^&%"));
  }, []);

  return { restart, restartKey: state };
}

export default useRestart;
