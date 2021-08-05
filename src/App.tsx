import "./custom.scss";
import { useEffect, useState, useCallback } from "react";
import github from "./db";
import githubQuery from "./Query";

function App() {
  const [userName, setUserName] = useState<string>("");
  const [repoList, setRepoList] = useState<any[]>([]);

  const fetchData = useCallback(() => {
    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(githubQuery),
    })
      .then((response) => response.json())
      .then((data) => {
        const viewer = data.data.viewer;
        setUserName(viewer.name);
        console.log(viewer.repositories.edges);
        setRepoList(viewer.repositories.edges);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill">Repos</i>
      </h1>
      <p>Hey there, {userName}</p>
      {repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map((repo) => (
            <li className="list-group-item" key={repo.node.id.toString()}>
              <a className="h5 mb-0 text-decoration-none" href={repo.node.url}>
                {repo.node.name}
              </a>
              <p className="small">{repo.node.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
