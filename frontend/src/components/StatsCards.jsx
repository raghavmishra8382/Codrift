import { TrophyIcon, UsersIcon, ArrowRightIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount, onCreateSession }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      {/* Active Count */}
      <div className="p-6 rounded-[20px] bg-gradient-to-br from-brand-surface/40 to-brand-bg border border-brand-border/60 hover:border-brand-primary/50 shadow-lg hover:shadow-brand-primary/20 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group flex flex-col justify-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl group-hover:bg-brand-primary/10 transition-colors" />
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="p-3 bg-brand-bg border border-brand-border rounded-xl group-hover:scale-110 transition-transform shadow-sm">
            <UsersIcon className="size-6 text-brand-primary" />
          </div>
          {activeSessionsCount > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 border border-green-500/20 text-xs font-medium text-green-400 shadow-sm">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full size-2 bg-green-500"></span>
              </span>
              Live
            </div>
          )}
        </div>
        <div className="relative z-10">
          <div className="text-5xl lg:text-6xl font-bold text-brand-text mb-2 tracking-tight">{activeSessionsCount}</div>
          <div className="text-sm font-semibold text-brand-muted mb-2 uppercase tracking-wider">Active Sessions</div>
          {activeSessionsCount === 0 ? (
            <div className="text-xs text-brand-muted/70 font-medium">No session running</div>
          ) : (
            <div className="text-xs text-green-400 font-medium flex items-center gap-1.5">
              <span className="text-[10px]">●</span> Live now
            </div>
          )}
        </div>
      </div>

      {/* Recent Count */}
      <div className="p-6 rounded-[20px] bg-gradient-to-br from-brand-surface/40 to-brand-bg border border-brand-border/60 hover:border-brand-secondary/50 shadow-lg hover:shadow-brand-secondary/20 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group flex flex-col justify-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/5 rounded-full blur-3xl group-hover:bg-brand-secondary/10 transition-colors" />
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="p-3 bg-brand-bg border border-brand-border rounded-xl group-hover:scale-110 transition-transform shadow-sm">
            <TrophyIcon className="size-6 text-brand-secondary" />
          </div>
        </div>
        <div className="relative z-10">
          <div className="text-5xl lg:text-6xl font-bold text-brand-text mb-2 tracking-tight">{recentSessionsCount}</div>
          <div className="text-sm font-semibold text-brand-muted mb-2 uppercase tracking-wider">Total Sessions</div>
          <button 
            onClick={onCreateSession}
            className="text-xs text-brand-primary font-bold flex items-center gap-1 hover:text-brand-primary/80 transition-colors w-fit group/btn mt-1"
          >
            + Create One <ArrowRightIcon className="size-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
