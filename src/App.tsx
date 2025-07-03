import { useState } from "react";
import "./App.css";
import { useTimeout } from "./hooks/useTimeout";
import { useSWR } from "./hooks/useSWR";

function App() {
  const [text, setText] = useState("your app");
  const [count, setCount] = useState(0);

  useTimeout(() => setText("my app after " + count + "secs"), count * 1000);

  return (
    <div>
      {text}
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  );
}

const fetcher = () =>
  new Promise<{ name: string }>((resolve) => {
    setTimeout(
      () =>
        resolve({
          name: "BFE.dev",
        }),
      500
    );
  });

export function AnotherApp() {
  const { data, error } = useSWR("/api", fetcher);

  if (error) return <div>failed</div>;
  if (!data) return <div>loading</div>;
  return <div>succeeded {data.name} </div>;
}

export default App;
