import "./custom.scss";
import { useEffect, useState, useCallback } from "react";
import github from "./db";
import githubQuery from "./Query";
import RepoInfo from "./RepoInfo";

function App() {
  const [userName, setUserName] = useState<string>("");
  const [repoList, setRepoList] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(10);
  const [queryString, setQueryString] = useState("vue");
  const [totalCount, setTotalCount] = useState(null);

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(githubQuery(pageCount, queryString));

    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: queryText,
    })
      .then((response) => response.json())
      .then((data) => {
        const viewer = data.data.viewer;
        const repos = data.data.search.nodes;
        const total = data.data.search.repositoryCount;
        setUserName(viewer.name);
        setRepoList(repos);
        setTotalCount(total);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageCount, queryString]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill">Repos</i>
      </h1>
      <p>Hey there, {userName}</p>
      <p>
        <b>Search for: </b> {queryString} | <b>Items per page: </b>
        {pageCount} | <b>Total results: </b>
        {totalCount}
      </p>
      {repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map((repo) => (
            <RepoInfo
              key={repo.id}
              id={repo.id}
              name={repo.name}
              url={repo.url}
              description={repo.description}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
