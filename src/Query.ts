const githubQuery = {
  query: `
  {
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

export default githubQuery;
