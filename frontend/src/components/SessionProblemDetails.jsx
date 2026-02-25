import { useState, useEffect } from "react";
import { Loader2Icon, PhoneOffIcon, ClockIcon, WifiIcon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { LANGUAGE_CONFIG } from "../data/problems";

function formatDifficultyLabel(d) {
  if (d == null || d === "") return "—";
  const s = String(d);
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function SessionProblemDetails({
  problem,
  session,
  isHost,
  participantCount,
  onEndSession,
  endSessionPending,
  selectedLanguage,
}) {
  const hostName = session?.host?.name || "Host";
  const difficulty = problem?.difficulty ?? session?.difficulty ?? "easy";

  const [elapsedTime, setElapsedTime] = useState("00:00:00");

  useEffect(() => {
    if (!session?.createdAt) return;
    
    const startTime = new Date(session.createdAt).getTime();
    
    const intervalId = setInterval(() => {
      const now = Date.now();
      const diff = now - startTime;
      
      if (diff < 0) return;
      
      const totalSeconds = Math.floor(diff / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      setElapsedTime(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [session?.createdAt]);

  const langName = selectedLanguage && LANGUAGE_CONFIG[selectedLanguage] ? LANGUAGE_CONFIG[selectedLanguage].name : "Language";

  return (
    <div className="h-full flex flex-col bg-brand-bg text-brand-text">
      <div className="shrink-0 p-4 sm:p-5 bg-brand-surface/30 border-b border-brand-border/60">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-brand-text truncate">
              {problem?.title ?? session?.problem ?? "Problem"}
            </h1>
            {problem?.category && (
              <p className="text-xs font-semibold text-brand-muted mt-1 uppercase tracking-wider">{problem.category}</p>
            )}
            <p className="text-xs font-medium text-brand-muted mt-3 flex items-center gap-3">
              <span className="flex items-center gap-1.5"><WifiIcon className="size-3 text-green-500" /> <span className="text-green-500">Connected</span></span>
              <span className="text-brand-border/80">•</span>
              <span className="flex items-center gap-1.5 font-mono bg-brand-surface/80 px-2 py-0.5 rounded text-[11px]"><ClockIcon className="size-3" /> {elapsedTime}</span>
              <span className="text-brand-border/80">•</span>
              <span className="flex items-center gap-1.5">{participantCount}/2 Participants</span>
              <span className="text-brand-border/80">•</span>
              <span className="flex items-center gap-1.5 text-brand-primary">{langName}</span>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span
              className={`px-3 py-1 rounded-md text-[11px] font-bold tracking-wide border inline-block ${getDifficultyBadgeClass(difficulty).replace('badge ', '')}`}
            >
              {formatDifficultyLabel(difficulty)}
            </span>
            {isHost && (
              <button
                type="button"
                onClick={onEndSession}
                disabled={endSessionPending}
                className="px-4 py-1.5 rounded-lg bg-red-500/10 text-red-400 font-semibold text-sm border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30 transition-all flex items-center gap-2 shadow-sm"
              >
                {endSessionPending ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <PhoneOffIcon className="size-4" />
                )}
                End session
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 custom-scrollbar">
        <section>
          <h2 className="text-sm font-bold text-brand-text mb-3 uppercase tracking-wider">Description</h2>
          {problem?.description?.text ? (
            <p className="text-brand-muted leading-relaxed text-sm">
              {problem.description.text}
            </p>
          ) : (
            <p className="text-brand-muted/50 text-sm">No description available.</p>
          )}
          {(problem?.description?.notes || []).map((note, idx) => (
            <p key={idx} className="text-brand-muted/80 text-sm mt-3 border-l-2 border-brand-border pl-3 py-0.5">
              {note}
            </p>
          ))}
        </section>

        {problem?.examples?.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-brand-text mb-3 uppercase tracking-wider">Examples</h2>
            <div className="space-y-4">
              {problem.examples.map((example, idx) => (
                <div key={idx} className="rounded-xl border border-brand-border/60 bg-brand-surface/30 overflow-hidden">
                  <div className="bg-brand-surface/50 px-4 py-2 border-b border-brand-border/60 flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-primary">Example {idx + 1}</span>
                  </div>
                  <div className="p-4 font-mono text-sm space-y-2 text-brand-text">
                    <div className="flex gap-3">
                      <span className="text-brand-muted font-semibold min-w-[60px] shrink-0">
                        Input:
                      </span>
                      <span className="break-all">{example.input}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-brand-muted font-semibold min-w-[60px] shrink-0">
                        Output:
                      </span>
                      <span className="break-all text-green-400">{example.output}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {problem?.constraints?.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-brand-text mb-3 uppercase tracking-wider">Constraints</h2>
            <ul className="space-y-2">
              {problem.constraints.map((constraint, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="text-brand-primary mt-1 text-xs">●</span>
                  <code className="text-sm text-brand-muted bg-brand-surface/50 px-2 py-0.5 rounded border border-brand-border/50 break-all">{constraint}</code>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

export default SessionProblemDetails;
