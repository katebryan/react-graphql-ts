interface RepoInfoProps {
  id: string;
  name: string;
  url: string;
  description: string;
}

const RepoInfo = ({ id, name, url, description }: RepoInfoProps) => {
  return (
    <>
      <li className="list-group-item" key={id.toString()}>
        <a className="h5 mb-0 text-decoration-none" href={url}>
          {name}
        </a>
        <p className="small">{description}</p>
      </li>
    </>
  );
};

export default RepoInfo;
