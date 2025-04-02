// NavigationProps is array of key-value pairs

import { NavLink } from "react-router";

type NavigationProps = { name: string; link: string }[];

const Navigation = ({ parts }: { parts: NavigationProps }) => {
  console.log({ parts });
  const lastPart = parts[parts.length - 1];
  if (!lastPart) {
    return null;
  }
  return (
    <>
      {parts.slice(0, -1).map((part) => (
        <>
          <NavLink key={part.link} to={part.link}>
            {part.name}/{" "}
          </NavLink>
        </>
      ))}
      <span className="text-gray-500"> {lastPart.name}</span>
    </>
  );
};

export default Navigation;
