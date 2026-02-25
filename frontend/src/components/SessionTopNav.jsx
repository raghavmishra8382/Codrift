import { useState } from "react";
import { Link, NavLink } from "react-router";
import {
  Code2Icon,
  CircleQuestionMarkIcon,
  LayoutDashboard,
  Share2Icon,
  CheckIcon,
} from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import toast from "react-hot-toast";

function SessionTopNav({ viewMode, onViewModeChange }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error("Could not copy link");
    }
  };

  const tab = (id, label) => (
    <button
      type="button"
      onClick={() => onViewModeChange(id)}
      className={`px-4 py-1.5 rounded-[8px] text-sm font-semibold transition-all duration-200 ${
        viewMode === id
          ? "bg-brand-surface shadow-sm text-brand-text border border-brand-border/60"
          : "text-brand-muted hover:text-brand-text hover:bg-brand-surface/40 border border-transparent"
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="shrink-0 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border/60 z-50 relative">
      <div className="max-w-[100vw] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <Link to="/dashboard" className="flex items-center gap-3 shrink-0 group">
          <div className="size-9 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shadow-brand-primary/20">
            <Code2Icon className="size-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-brand-text leading-none">
              Codrift
            </span>
            <span className="text-[10px] font-semibold text-brand-muted uppercase tracking-widest mt-0.5">
              Workspace
            </span>
          </div>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-1 rounded-[10px] bg-brand-surface/30 p-1 border border-brand-border/40 backdrop-blur-sm">
          {tab("document", "Document")}
          {tab("both", "Both")}
          {tab("canvas", "Canvas")}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <NavLink
            to="/problems"
            className={({ isActive }) =>
              `hidden md:inline-flex px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 items-center gap-2 ${
                isActive
                  ? "bg-brand-surface/60 text-brand-text shadow-sm border border-brand-border/50"
                  : "hover:bg-brand-surface/40 text-brand-muted hover:text-brand-text border border-transparent"
              }`
            }
          >
            <CircleQuestionMarkIcon className="size-4" />
            Problems
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `hidden md:inline-flex px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 items-center gap-2 ${
                isActive
                  ? "bg-brand-surface/60 text-brand-text shadow-sm border border-brand-border/50"
                  : "hover:bg-brand-surface/40 text-brand-muted hover:text-brand-text border border-transparent"
              }`
            }
          >
            <LayoutDashboard className="size-4" />
            Dashboard
          </NavLink>
          <div className="pl-2 border-l border-brand-border/40 h-6 flex items-center">
            <UserButton
              appearance={{
                elements: { avatarBox: "size-8 ring-2 ring-brand-primary/20 hover:ring-brand-primary/50 transition-all" },
              }}
            />
          </div>
          <button
            type="button"
            onClick={copyShareLink}
            className={`px-4 py-1.5 ml-1 rounded-lg font-semibold text-sm transition-all flex items-center gap-1.5 shadow-lg ${
              isCopied
                ? "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 shadow-none"
                : "bg-brand-primary text-white hover:bg-brand-primary/90 shadow-brand-primary/20"
            }`}
          >
            {isCopied ? (
              <>
                <CheckIcon className="size-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Share2Icon className="size-3.5" />
                Share
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default SessionTopNav;
