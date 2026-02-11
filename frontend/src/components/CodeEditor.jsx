import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon, ChevronDownIcon, ChevronUpIcon, TerminalIcon, CheckIcon, XIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";

function CodeEditor({
  selectedLanguage,
  code,
  runStatus,
  onLanguageChange,
  onCodeChange,
  onRunCode,
  isConsoleOpen,
  onToggleConsole,
}) {
  return (
    <div className="h-full bg-brand-bg flex flex-col relative">
      <div className="flex items-center justify-between px-4 py-3 bg-brand-surface/30 border-b border-brand-border/60">
        <div className="flex items-center gap-3">
          <div className="size-7 rounded-md bg-brand-surface border border-brand-border/60 flex items-center justify-center p-1.5 shadow-sm">
            <img
              src={LANGUAGE_CONFIG[selectedLanguage].icon}
              alt="Language Icon"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="relative group">
            <select
              className="appearance-none bg-brand-surface text-brand-text text-sm font-semibold rounded-lg pl-3 pr-8 py-1.5 border border-brand-border/60 focus:outline-none focus:border-brand-primary/50 transition-colors cursor-pointer hover:bg-brand-surface/80 shadow-sm"
              value={selectedLanguage}
              onChange={onLanguageChange}
            >
              {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
                <option key={key} value={key}>
                  {lang.name}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="size-4 text-brand-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-brand-text transition-colors" />
          </div>
        </div>

        <button
          className={`px-4 py-1.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-1.5 shadow-sm border ${
            runStatus === "running"
              ? "bg-brand-surface/50 text-brand-muted border-brand-border/60 cursor-not-allowed"
              : runStatus === "success"
              ? "bg-green-500/10 text-green-400 border-green-500/20"
              : runStatus === "error"
              ? "bg-red-500/10 text-red-400 border-red-500/20"
              : "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20 hover:border-green-500/30"
          }`}
          disabled={runStatus === "running"}
          onClick={onRunCode}
        >
          {runStatus === "running" ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              Running...
            </>
          ) : runStatus === "success" ? (
            <>
              <CheckIcon className="size-4" />
              Passed
            </>
          ) : runStatus === "error" ? (
            <>
              <XIcon className="size-4" />
              Failed
            </>
          ) : (
            <>
              <PlayIcon className="size-4" />
              Run Code
            </>
          )}
        </button>
      </div>

      <div className="flex-1 min-h-0 bg-[#1e1e1e]">
        <Editor
          height="100%"
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 15,
            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
            lineHeight: 24,
            padding: { top: 20, bottom: 20 },

            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },

            wordWrap: "on",
            renderLineHighlight: "all",
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
          }}
        />
      </div>

      {/* Bottom Console Toggle Bar */}
      {!isConsoleOpen && (
        <div className="shrink-0 bg-brand-surface/30 border-t border-brand-border/60 px-4 py-1.5 flex items-center justify-between">
          <button
            onClick={onToggleConsole}
            className="flex items-center gap-2 text-xs font-semibold text-brand-muted hover:text-brand-text transition-colors py-1"
          >
            <TerminalIcon className="size-3.5" />
            Console
            <ChevronUpIcon className="size-3.5 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
}

export default CodeEditor;
