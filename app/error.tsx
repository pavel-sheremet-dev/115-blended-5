const Error = ({ error }: { error: Error }) => {
  return <div>OOPS, {error.message}</div>;
};

export default Error;
