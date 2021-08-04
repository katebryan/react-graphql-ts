import "./custom.scss";
import github from "./db";
import { useEffect, useState } from "react";

function App() {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const githubQuery = {
      query: `
      {
        viewer {
          name
        }
      }
    `,
    };

    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(githubQuery),
    })
      .then((response) => response.json())
      .then((data) => setUserName(data.data.viewer.name))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill">Repos</i>
      </h1>
      <p>Hey there, {userName}</p>
    </div>
  );
}

export default App;
