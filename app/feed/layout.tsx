import React from "react";
import Login from "../components/Login";

const FeedLayoutComponent = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const isAuthenticated = true;
  return isAuthenticated ? (
    <div>{children}</div>
  ) : (
    <div>
      <Login />
    </div>
  );
};

export default FeedLayoutComponent;
