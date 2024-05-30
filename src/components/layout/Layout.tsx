import React from "react";
import Navbar from "../navbar/Navbar";

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
