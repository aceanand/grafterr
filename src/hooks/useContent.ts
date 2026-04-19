import { useCallback, useEffect, useState } from "react";
import { fetchContent, type Content } from "@/services/api";

type State =
  | { status: "loading" }
  | { status: "success"; data: Content }
  | { status: "error"; error: string };

export function useContent() {
  const [state, setState] = useState<State>({ status: "loading" });

  const load = useCallback(async () => {
    setState({ status: "loading" });
    try {
      const data = await fetchContent();
      setState({ status: "success", data });
    } catch (e) {
      setState({
        status: "error",
        error: e instanceof Error ? e.message : "Unknown error",
      });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { ...state, retry: load };
}
