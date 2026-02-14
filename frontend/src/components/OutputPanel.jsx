import { TerminalIcon, XIcon, ListTreeIcon } from "lucide-react";
import { useState } from "react";

function OutputPanel({ output, isRunning, onClose, problem }) {
  const [activeTab, setActiveTab] = useState("output");

  return (
    <div className="h-full bg-brand-bg flex flex-col font-mono text-sm relative">
      <div className="px-4 py-1.5 bg-brand-surface/30 border-b border-brand-border/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("output")}
            className={`px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
              activeTab === "output"
                ? "bg-brand-surface text-brand-text border border-brand-border/60"
                : "text-brand-muted hover:text-brand-text hover:bg-brand-surface/50 border border-transparent"
            }`}
          >
            <TerminalIcon className="size-3.5" />
            Output
          </button>
          {problem?.examples?.length > 0 && (
            <button
              onClick={() => setActiveTab("test_cases")}
              className={`px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                activeTab === "test_cases"
                  ? "bg-brand-surface text-brand-text border border-brand-border/60"
                  : "text-brand-muted hover:text-brand-text hover:bg-brand-surface/50 border border-transparent"
              }`}
            >
              <ListTreeIcon className="size-3.5" />
              Test Cases
            </button>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-brand-muted hover:text-brand-text p-1 rounded-md hover:bg-brand-surface/80 transition-colors"
          >
            <XIcon className="size-3.5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        {activeTab === "output" ? (
          <>
            {isRunning ? (
              <div className="flex items-center gap-2 text-brand-muted/70">
                <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
                <p>Executing code...</p>
              </div>
            ) : !output ? (
              <p className="text-brand-muted/50 italic">
                Output will appear here...
              </p>
            ) : (
              <pre className="text-brand-text whitespace-pre-wrap font-mono leading-relaxed">
                {output}
              </pre>
            )}
          </>
        ) : (
          <div className="space-y-4">
            {problem?.examples?.map((example, idx) => (
              <div key={idx} className="rounded-xl border border-brand-border/60 bg-brand-surface/30 overflow-hidden">
                <div className="bg-brand-surface/50 px-4 py-2 border-b border-brand-border/60 flex items-center gap-2">
                  <span className="text-xs font-bold text-brand-primary">Case {idx + 1}</span>
                </div>
                <div className="p-4 font-mono text-sm space-y-3 text-brand-text">
                  <div>
                    <span className="text-brand-muted font-semibold block mb-1 text-xs">
                      Input:
                    </span>
                    <div className="bg-brand-bg px-3 py-2 rounded-lg border border-brand-border/40 text-brand-text">
                      {example.input}
                    </div>
                  </div>
                  <div>
                    <span className="text-brand-muted font-semibold block mb-1 text-xs">
                      Expected Output:
                    </span>
                    <div className="bg-brand-bg px-3 py-2 rounded-lg border border-brand-border/40 text-green-400">
                      {example.output}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;
