import { Link, NavLink } from "react-router";
import { CircleQuestionMarkIcon, LayoutDashboard, Code2Icon } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-brand-bg/80 border-b border-brand-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="size-9 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Code2Icon className="size-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-brand-text">
            Codrift
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-2">
          <NavLink
            to="/problems"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium ${
                isActive
                  ? "bg-brand-surface text-brand-text border border-brand-border/60 shadow-sm"
                  : "text-brand-muted hover:text-brand-text hover:bg-brand-surface/40"
              }`
            }
          >
            <CircleQuestionMarkIcon className="size-4" />
            <span className="hidden sm:inline">Problems</span>
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium ${
                isActive
                  ? "bg-brand-surface text-brand-text border border-brand-border/60 shadow-sm"
                  : "text-brand-muted hover:text-brand-text hover:bg-brand-surface/40"
              }`
            }
          >
            <LayoutDashboard className="size-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </NavLink>
          
          <div className="ml-4 pl-4 border-l border-brand-border/50 flex items-center">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
