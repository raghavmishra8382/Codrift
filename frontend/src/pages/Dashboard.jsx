import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Code2Icon, PlusIcon, TerminalIcon } from "lucide-react";
import {
  useActiveSessions,
  useCreateSession,
  useDeleteSession,
  useEndSession,
  useMyRecentSessions,
} from "../hooks/useSessions";

import NavBar from "../components/NavBar";
import StatsCards from "../components/StatsCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";
import RecentActivity from "../components/RecentActivity";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({
    problem: "",
    difficulty: "",
  });

  const createSessionMutation = useCreateSession();
  const endSessionMutation = useEndSession();
  const deleteSessionMutation = useDeleteSession();

  const { data: activeSessionsData, isLoading: loadingActiveSessions } =
    useActiveSessions();

  const { data: recentSessionsData, isLoading: loadingRecentSessions } =
    useMyRecentSessions();

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          navigate(`/session/${data.session._id}`);
        },
      }
    );
  };

  const activeSessions = activeSessionsData?.session || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const isUserInSession = (session) => {
    if (!user?.id) return false;

    return (
      session.host?.clerkId === user.id ||
      session.participant?.clerkId === user.id
    );
  };

  const handleEndSession = (sessionId) => {
    const confirmed = window.confirm(
      "End this session and move it to past sessions?",
    );
    if (!confirmed) return;

    endSessionMutation.mutate(sessionId);
  };

  const handleDeleteSession = (sessionId) => {
    const confirmed = window.confirm(
      "Delete this session from your past sessions?",
    );
    if (!confirmed) return;

    deleteSessionMutation.mutate(sessionId);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <>
      <div className="min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-primary/30 flex flex-col relative overflow-hidden">
        {/* Subtle global radial gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <NavBar />

        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 space-y-8 relative z-10">

          {/* ================= WELCOME ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-text to-brand-muted leading-tight">
              {getGreeting()} 👋<br />
              {user?.firstName || "User"}
            </h1>
          </motion.div>

          {/* ================= BENTO GRID ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Live Sessions (Hero) */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-4"
            >
              <ActiveSessions
                sessions={activeSessions}
                isLoading={loadingActiveSessions}
                isUserInSession={isUserInSession}
                currentUserId={user?.id}
                onEndSession={handleEndSession}
                endingSessionId={endSessionMutation.variables}
                onCreateSession={() => setShowCreateModal(true)}
              />
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-4"
            >
              <StatsCards
                activeSessionsCount={activeSessions.length}
                recentSessionsCount={recentSessions.length}
                onCreateSession={() => setShowCreateModal(true)}
              />
            </motion.div>

            {/* Create Action Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div 
                onClick={() => setShowCreateModal(true)}
                className="h-full min-h-[250px] p-6 rounded-[20px] bg-gradient-to-br from-brand-surface/40 to-brand-bg border border-brand-border/60 hover:border-brand-primary/50 shadow-lg hover:shadow-brand-primary/20 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group flex flex-col justify-center items-center text-center cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="size-16 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary shadow-lg shadow-brand-primary/25 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TerminalIcon className="size-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-text mb-4">New Workspace</h3>
                <div className="flex flex-col gap-2.5 w-full max-w-[180px] mx-auto text-left relative z-10">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-brand-surface border border-brand-border/50">
                    <div className="size-1.5 rounded-full bg-brand-primary shrink-0" />
                    <span className="text-xs font-semibold text-brand-muted">Create Session</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-brand-surface border border-brand-border/50">
                    <div className="size-1.5 rounded-full bg-brand-secondary shrink-0" />
                    <span className="text-xs font-semibold text-brand-muted">Choose Problem</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-brand-surface border border-brand-border/50">
                    <div className="size-1.5 rounded-full bg-green-400 shrink-0" />
                    <span className="text-xs font-semibold text-brand-muted">Invite Candidate</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <RecentSessions
                sessions={recentSessions}
                isLoading={loadingRecentSessions}
                onDeleteSession={handleDeleteSession}
                deletingSessionId={deleteSessionMutation.variables}
              />
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-1"
            >
              <RecentActivity />
            </motion.div>

          </div>

        </main>
      </div>

      {/* ================= MODAL ================= */}
      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
}

export default DashboardPage;
