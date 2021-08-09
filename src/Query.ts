export const githubQuery = (pageCount: string, queryString: string) => {
  return {
    query: `
    {
      viewer {
        name
      }
      search(query: "${queryString} user:katebry sort:updated-desc", type: REPOSITORY, first: ${pageCount}) {
        repositoryCount
        nodes {
          ... on Repository {
            name
            description
            id
            url
          }
        }
      }
    }
    `,
  };
};

export const searchGithubQuery = {
  query: `
    {
      viewer {
        name
      }
      search(query: "user:katebry sort:updated-desc", type: REPOSITORY, first: 10) {
        nodes {
          ... on Repository {
            name
            description
            id
            url
          }
        }
      }
    }
    `,
};

export const githubPaginatedQuery = {
  query: `{
        viewer {
          name
          repositories(first: 10) {
            edges {
              node {
                id
                name
                createdAt
                description
                url
              }
            }
          }
        }
      }
      `,
};
