import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { STATUS } from "../App";

function useRestart(setStatus: Dispatch<SetStateAction<STATUS>>) {
  const [state, setState] = useState<string>("#5345^&%");

  const restart = useCallback(() => {
    setState((prev) => (prev === "#5345^&%" ? "#5345^" : "#5345^&%"));
    setStatus("idle");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { restart, restartKey: state };
}

export default useRestart;
