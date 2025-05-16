import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
    <div className="flex-1">
      <Outlet />
    </div>
    </main>
  );
};

export default Layout;