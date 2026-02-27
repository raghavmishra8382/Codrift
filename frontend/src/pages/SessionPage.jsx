import { useParams, useNavigate } from "react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useEndSession, useSessionById, useJoinSession } from "../hooks/useSessions";
import { useUser } from "@clerk/clerk-react";
import { Loader2Icon } from "lucide-react";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import toast from "react-hot-toast";
import VideoCallUI from "../components/VideoCallUI";
import SessionTopNav from "../components/SessionTopNav";
import SessionProblemDetails from "../components/SessionProblemDetails";
import CodeEditor from "../components/CodeEditor";
import OutputPanel from "../components/OutputPanel";
import SecureQuiz from "../components/SecureQuiz";
import useStreamClient from "../hooks/useStreamClient";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston";

function SessionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { data: sessionData, isLoading: sessionLoading } = useSessionById(id);
  const joinSessionMutation = useJoinSession(id);
  const endSessionMutation = useEndSession(id);
  const {
    mutate: joinSession,
    isPending: isJoiningMutation,
    isError: hasJoinError,
    isSuccess: hasJoinedSession,
  } = joinSessionMutation;

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;
  const isFullForCurrentUser =
    !!session?.participant && !isHost && !isParticipant;
  const joinAttemptKeyRef = useRef(null);
  const joinAttemptKey = `${id}:${user?.id || ""}`;

  const [viewMode, setViewMode] = useState("both");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [runStatus, setRunStatus] = useState("idle");

  const problem = useMemo(
    () =>
      session?.problem
        ? Object.values(PROBLEMS).find((p) => p.title === session.problem) ?? null
        : null,
    [session?.problem],
  );

  const participantCount = session
    ? 1 + (session.participant ? 1 : 0)
    : 0;

  useEffect(() => {
    const hasAttemptedCurrentSession =
      joinAttemptKeyRef.current === joinAttemptKey;
    const shouldJoinAsParticipant =
      session &&
      user &&
      !isHost &&
      !session.participant &&
      !hasAttemptedCurrentSession &&
      !isJoiningMutation &&
      !hasJoinError;

    if (!shouldJoinAsParticipant) return;

    joinAttemptKeyRef.current = joinAttemptKey;
    joinSession();
  }, [
    session,
    user,
    isHost,
    isJoiningMutation,
    hasJoinError,
    joinAttemptKey,
    joinSession,
  ]);

  const isJoiningSession =
    !!session &&
    !!user &&
    !isHost &&
    !isParticipant &&
    !isFullForCurrentUser &&
    !hasJoinError &&
    (isJoiningMutation || hasJoinedSession);

  const handleEndSession = () => {
    const confirmed = window.confirm(
      "End this session and move it to past sessions?",
    );
    if (!confirmed) return;

    endSessionMutation.mutate(undefined, {
      onSuccess: () => navigate("/dashboard"),
    });
  };

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[selectedLanguage] || "");
      setOutput("");
    } else {
      setCode("");
      setOutput("");
    }
  }, [problem, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    if (problem) {
      setCode(problem.starterCode[newLang] || "");
    }
    setOutput("");
  };

  const handleRunCode = async () => {
    try {
      setRunStatus("running");
      setOutput("");

      const result = await executeCode(selectedLanguage, code);

      if (!result.success) {
        const errorMsg = result.error || "Runtime error";
        const combinedOutput = result.output 
          ? `❌ Compilation Failed\n\n${errorMsg}\n\n${result.output}`
          : `❌ Compilation Failed\n\n${errorMsg}`;
          
        setOutput(combinedOutput.trim());
        setRunStatus("error");
        setTimeout(() => setRunStatus("idle"), 2500);
        return;
      }

      setOutput(result.output || "");
      setRunStatus("success");
      setTimeout(() => setRunStatus("idle"), 2500);
    } catch (error) {
      console.error(error);
      setOutput(`❌ Execution Failed\n\n${error.message || "An unexpected error occurred."}`);
      setRunStatus("error");
      setTimeout(() => setRunStatus("idle"), 2500);
    }
  };

  const handleFullscreenExit = () => {
    toast.error("User tried to exit full screen view");
  };

  const {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  } = useStreamClient(
    session,
    sessionLoading || isJoiningSession,
    isHost,
    isParticipant,
  );

  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  // When code is run, automatically open the console
  const handleRunCodeWithConsole = () => {
    setIsConsoleOpen(true);
    handleRunCode();
  };

  const resizeHandleH =
    "w-1.5 bg-brand-surface hover:bg-brand-primary transition-colors cursor-col-resize z-10";
  const resizeHandleV =
    "h-1.5 bg-brand-surface hover:bg-brand-primary transition-colors cursor-row-resize z-10";

  const workspacePanels = (
    <PanelGroup direction="vertical" className="h-full">
      <Panel defaultSize={42} minSize={22}>
        <SessionProblemDetails
          problem={problem}
          session={session}
          isHost={isHost}
          participantCount={participantCount}
          onEndSession={handleEndSession}
          endSessionPending={endSessionMutation.isPending}
          selectedLanguage={selectedLanguage}
        />
      </Panel>
      <PanelResizeHandle className={resizeHandleV} />
      <Panel defaultSize={58} minSize={28}>
        <PanelGroup direction="vertical" className="h-full">
          <Panel defaultSize={isConsoleOpen ? 72 : 100} minSize={35}>
            <CodeEditor
              selectedLanguage={selectedLanguage}
              code={code}
              runStatus={runStatus}
              onLanguageChange={handleLanguageChange}
              onCodeChange={setCode}
              onRunCode={handleRunCodeWithConsole}
              isConsoleOpen={isConsoleOpen}
              onToggleConsole={() => setIsConsoleOpen(!isConsoleOpen)}
            />
          </Panel>
          {isConsoleOpen && (
            <>
              <PanelResizeHandle className={resizeHandleV} />
              <Panel defaultSize={28} minSize={18}>
                <OutputPanel output={output} isRunning={runStatus === "running"} problem={problem} onClose={() => setIsConsoleOpen(false)} />
              </Panel>
            </>
          )}
        </PanelGroup>
      </Panel>
    </PanelGroup>
  );

  if (sessionLoading || isJoiningSession || isInitializingCall) {
    return (
      <div className="h-screen flex items-center justify-center bg-brand-bg text-brand-text relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="text-center relative z-10">
          <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-brand-primary mb-4" />
          <p className="text-lg font-medium">
            {isJoiningSession
              ? "Joining session..."
              : "Setting up your session..."}
          </p>
        </div>
      </div>
    );
  }

  if (isFullForCurrentUser) {
    return (
      <div className="h-screen flex items-center justify-center bg-brand-bg text-brand-text relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="text-center relative z-10">
          <p className="text-xl font-bold text-red-400 mb-6">This session is already full</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2.5 rounded-xl bg-brand-surface border border-brand-border text-brand-text font-medium hover:border-brand-primary/50 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!session || !call) {
    return (
      <div className="h-screen flex items-center justify-center bg-brand-bg text-brand-text relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="text-center relative z-10">
          <p className="text-xl font-bold text-red-400 mb-6">Failed to load session</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2.5 rounded-xl bg-brand-surface border border-brand-border text-brand-text font-medium hover:border-brand-primary/50 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <StreamVideo client={streamClient}>
      <StreamCall call={call}>
        <div className="h-screen w-screen bg-brand-bg flex flex-col text-brand-text overflow-hidden selection:bg-brand-primary/30">
          <SecureQuiz onFullscreenExit={handleFullscreenExit} />
          <SessionTopNav viewMode={viewMode} onViewModeChange={setViewMode} />

          <div className="flex-1 min-h-0 p-3 pt-3 pb-3">
            {viewMode === "canvas" && (
              <div className="h-full rounded-[20px] overflow-hidden border border-brand-border/60 bg-brand-surface/30 shadow-lg p-2">
                <VideoCallUI chatClient={chatClient} channel={channel} />
              </div>
            )}

            {viewMode === "document" && (
              <div className="h-full rounded-[20px] overflow-hidden border border-brand-border/60 shadow-lg">
                {workspacePanels}
              </div>
            )}

            {viewMode === "both" && (
              <PanelGroup direction="horizontal" className="h-full">
                <Panel defaultSize={58} minSize={32}>
                  <div className="h-full rounded-[20px] overflow-hidden border border-brand-border/60 shadow-lg mr-1.5">
                    {workspacePanels}
                  </div>
                </Panel>
                <PanelResizeHandle className={resizeHandleH} />
                <Panel defaultSize={42} minSize={28}>
                  <div className="h-full rounded-[20px] overflow-hidden border border-brand-border/60 bg-brand-surface/30 p-2 ml-1.5 shadow-lg">
                    <VideoCallUI chatClient={chatClient} channel={channel} />
                  </div>
                </Panel>
              </PanelGroup>
            )}
          </div>
        </div>
      </StreamCall>
    </StreamVideo>
  );
}

export default SessionPage;
