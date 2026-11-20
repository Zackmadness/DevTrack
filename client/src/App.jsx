import { useEffect, useState } from "react";
import { getServerMessage } from "./services/api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    getServerMessage()
      .then((data) => setMessage(data.message))
      .catch(console.error);
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        {message}
      </h1>
    </div>
  );
}

export default App;