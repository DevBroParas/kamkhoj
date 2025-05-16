import React, { useEffect, useState, useRef } from "react";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "../context/DarkMode";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout, user } = useAuth();
  const { setTheme } = useTheme();

  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  // Scroll handler to detect direction
  const controlNavbar = () => {
    if (typeof window === "undefined") return;

    if (window.scrollY < lastScrollY.current) {
      // Scrolling up
      setShowNavbar(true);
    } else if (window.scrollY > lastScrollY.current) {
      // Scrolling down
      setShowNavbar(false);
    }
    lastScrollY.current = window.scrollY;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 bg-primary-foreground shadow-md h-14 flex items-center justify-between px-6 md:px-12
        transition-transform duration-300 ease-in-out
        ${showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      `}
      style={{ backdropFilter: "saturate(180%) blur(12px)" }}
    >
      <h1 className="text-3xl font-extrabold cursor-default select-none tracking-wide text-fire transition-colors duration-300">
        Kaam{" "}
        <span className="text-fire-foreground hover:text-fire cursor-pointer transition-colors duration-300">
          Khoj
        </span>
        <span className="text-fire-foreground">.in</span>
      </h1>

      <div className="flex items-center gap-6 text-lg font-semibold text-fire-foreground">
        {/* link to recruter */}
        {user?.role === "recruiter" && (
          <Link to="/recruters" >
          <p
            className="cursor-pointer hover:text-fire hover:underline transition"
            title="Post a job"
          >
            Post a job
          </p>
          </Link>
        )}
        {/* link to student */}
        {user?.role === "student" && (
          <Link to="/jobs" >
          <p
            className="cursor-pointer hover:text-fire hover:underline transition"
            title="Apply for a job"
          >
            Apply for a job
          </p>
          </Link>
        )}
{/* dark mode */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Toggle theme"
              className="relative p-2"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[120px]">
            <DropdownMenuItem
              className="cursor-pointer hover:bg-fire hover:text-white transition"
              onClick={() => setTheme("light")}
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-fire hover:text-white transition"
              onClick={() => setTheme("dark")}
            >
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-fire hover:text-white transition"
              onClick={() => setTheme("system")}
            >
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          onClick={handleLogout}
          variant="destructive"
          className="px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
