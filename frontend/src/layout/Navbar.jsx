import React from "react";
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


const Navbar = () => {
  const { logout, user } = useAuth();
  const { setTheme } = useTheme();

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <nav className="bg-primary-foreground h-12 flex items-center justify-between p-4">
      <h1 className="[color:var(--fire)] p-4 text-2xl font-bold">
        Kaam <span className="[color:var(--fire-foreground)]">Khoj</span>.
        <span className="[color:var(--fire-foreground)]">in</span>
      </h1>
      <div className="flex items-center gap-4">
        {user?.role === "recruiter" && (
          <p className="text-fire-foreground font-bold active:text-fire cursor-pointer">
            Post a job
          </p>
        )}
        {user?.role === "student" && (
          <p className="text-fire-foreground font-bold active:text-fire cursor-pointer">
            Apply for a job
          </p>
        )}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button onClick={handleLogout} variant={"destructive"}>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
