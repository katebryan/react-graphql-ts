import "./custom.scss";
import { useEffect, useState, useCallback } from "react";
import github from "./db";
import { paginatedGithubQuery } from "./Query";
import RepoInfo from "./RepoInfo";
import SearchBox from "./SearchBox";
import NavButtons from "./NavButtons";

function App() {
  const [userName, setUserName] = useState<string>("");
  const [repoList, setRepoList] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState<string>("10");
  const [queryString, setQueryString] = useState("");
  const [totalCount, setTotalCount] = useState("1");

  const [startCursor, setStartCursor] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [paginationKeyword, setPaginationKeyword] = useState("first");
  const [paginationString, setPaginationString] = useState("");

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(
      paginatedGithubQuery(
        pageCount,
        queryString,
        paginationKeyword,
        paginationString
      )
    );

    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: queryText,
    })
      .then((response) => response.json())
      .then((data) => {
        const viewer = data.data.viewer;
        const repos = data.data.search.edges;
        const total = data.data.search.repositoryCount;
        const start = data.data.search.pageInfo?.startCursor;
        const end = data.data.search.pageInfo?.endCursor;
        const next = data.data.search.pageInfo?.hasNextPage;
        const prev = data.data.search.pageInfo?.hasPreviousPage;
        setUserName(viewer.name);
        setRepoList(repos);
        setTotalCount(total);
        setStartCursor(start);
        setEndCursor(end);
        setHasNextPage(next);
        setHasPreviousPage(prev);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageCount, queryString, paginationString, paginationKeyword]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill">Repos</i>
      </h1>
      <p>Hey there, {userName}</p>
      <SearchBox
        totalCount={totalCount}
        pageCount={pageCount}
        queryString={queryString}
        onQueryChange={(myString) => setQueryString(myString)}
        onTotalChange={(newTotal) => setPageCount(newTotal)}
      />
      <NavButtons
        start={startCursor}
        end={endCursor}
        next={hasNextPage}
        previous={hasPreviousPage}
        onPage={(myKeyword, myString) => {
          setPaginationKeyword(myKeyword);
          setPaginationString(myString);
        }}
      />
      {repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map((repo) => (
            <>
              <RepoInfo
                key={repo.node.id}
                id={repo.node.id}
                name={repo.node.name}
                url={repo.node.url}
                description={repo.node.description}
              />
            </>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
