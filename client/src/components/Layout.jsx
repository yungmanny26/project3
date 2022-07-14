import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({children}) => {
  return (
    <div className="layout">
      <head>
        <title>Nike Outlet store</title>
      </head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
      {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};

export default Layout;