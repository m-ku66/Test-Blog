"use client";
import React from "react";
import Login from "../components/Login";
import useAuth from "../lib/hooks/useAuth";

const FeedLayoutComponent = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  return useAuth() ? (
    <div>{children}</div>
  ) : (
    <div>
      <Login />
    </div>
  );
};

export default FeedLayoutComponent;
