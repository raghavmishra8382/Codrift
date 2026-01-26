import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
  CircleStopIcon,
} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

function ActiveSessions({
  sessions,
  isLoading,
  isUserInSession,
  currentUserId,
  onEndSession,
  endingSessionId,
  onCreateSession,
}) {
  return (
    <div className="h-full flex flex-col rounded-[20px] bg-gradient-to-br from-brand-surface/40 to-brand-bg border border-brand-border/60 hover:border-brand-primary/50 shadow-lg hover:shadow-brand-primary/20 transition-all duration-300 hover:-translate-y-2 overflow-hidden relative group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl group-hover:bg-brand-primary/10 transition-colors pointer-events-none" />
      
      <div className="p-5 border-b border-brand-border/40 relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl shadow-lg shadow-brand-primary/25">
            <ZapIcon className="size-5 text-white" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-brand-text">Live Sessions</h2>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 border border-green-500/20 text-xs font-medium text-green-400">
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2 bg-green-500"></span>
          </span>
          {sessions.length} active
        </div>
      </div>

      <div className="p-5 flex-1 max-h-[300px] overflow-y-auto space-y-3 relative z-10 custom-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <LoaderIcon className="size-10 animate-spin text-brand-primary" />
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => {
            const isHost = session.host?.clerkId === currentUserId;
            const isEnding = endingSessionId === session._id;

            return (
              <div
                key={session._id}
                className="rounded-xl bg-brand-bg border border-brand-border hover:border-brand-primary/50 hover:shadow-lg hover:shadow-brand-primary/10 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-between gap-4 p-4 group/item"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="relative size-12 shrink-0 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center shadow-inner group-hover/item:border-brand-primary/50 transition-colors">
                    <Code2Icon className="size-5 text-brand-primary" />
                    <div className="absolute -top-1 -right-1 size-3 bg-green-500 rounded-full border-2 border-brand-bg" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-brand-text truncate">{session.problem}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border inline-block ${getDifficultyBadgeClass(session.difficulty).replace('badge ', '')}`}>
                        {session.difficulty.charAt(0).toUpperCase() + session.difficulty.slice(1)}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-brand-muted">
                      <div className="flex items-center gap-1.5">
                        <CrownIcon className="size-3.5" />
                        <span className="font-medium">{session.host?.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <UsersIcon className="size-3.5" />
                        <span>{session.participant ? "2/2" : "1/2"}</span>
                      </div>
                      {session.participant && !isUserInSession(session) ? (
                        <span className="text-[10px] font-semibold text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded border border-red-400/20">FULL</span>
                      ) : (
                        <span className="text-[10px] font-semibold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded border border-green-400/20">OPEN</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isHost && (
                    <button
                      type="button"
                      onClick={() => onEndSession?.(session._id)}
                      className="size-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 flex items-center justify-center transition-colors"
                      disabled={isEnding}
                      title="End session"
                    >
                      {isEnding ? (
                        <LoaderIcon className="size-4 animate-spin" />
                      ) : (
                        <CircleStopIcon className="size-4" />
                      )}
                    </button>
                  )}

                  {session.participant && !isUserInSession(session) ? (
                    <button className="px-4 py-2 rounded-lg bg-brand-surface text-brand-muted font-medium text-sm border border-brand-border cursor-not-allowed">
                      Full
                    </button>
                  ) : (
                    <Link
                      to={`/session/${session._id}`}
                      className="px-4 py-2 rounded-lg bg-brand-primary text-white font-semibold text-sm hover:bg-brand-primary/90 hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center gap-2"
                    >
                      {isUserInSession(session) ? "Rejoin" : "Join"}
                      <ArrowRightIcon className="size-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-6 flex flex-col items-center justify-center min-h-[160px]">
            <div className="size-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-4">
              <SparklesIcon className="size-6 text-brand-primary" />
            </div>
            <p className="text-brand-text text-lg font-bold mb-1">No Live Sessions</p>
            <p className="text-xs text-brand-muted mb-4">Create your first interview workspace.</p>
            <button
              onClick={onCreateSession}
              className="px-5 py-2 rounded-xl bg-brand-primary text-white font-semibold text-xs hover:bg-brand-primary/90 hover:shadow-lg hover:shadow-brand-primary/25 transition-all flex items-center gap-2"
            >
              Create Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default ActiveSessions;
