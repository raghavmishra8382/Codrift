import { Code2Icon, LoaderIcon, PlusIcon, XIcon } from "lucide-react";
import { PROBLEMS } from "../data/problems";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const problems = Object.values(PROBLEMS);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#0F0F12] border border-brand-border/60 rounded-2xl shadow-2xl shadow-brand-primary/10 overflow-hidden flex flex-col">
        {/* Glow */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-brand-border/40 bg-brand-surface/20">
          <h3 className="text-xl font-semibold text-brand-text">Create New Session</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-surface transition-colors"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8">
          {/* PROBLEM SELECTION */}
          <div className="space-y-3">
            <label className="flex items-center gap-1.5 text-sm font-medium text-brand-text">
              Select Problem
              <span className="text-brand-primary">*</span>
            </label>

            <select
              className="w-full bg-[#15151A] border border-brand-border/60 text-brand-text text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all appearance-none"
              value={roomConfig.problem}
              onChange={(e) => {
                const selectedProblem = problems.find((p) => p.title === e.target.value);
                setRoomConfig({
                  difficulty: selectedProblem.difficulty,
                  problem: e.target.value,
                });
              }}
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394A3B8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em 1.2em' }}
            >
              <option value="" disabled className="text-brand-muted">
                Choose a coding problem...
              </option>

              {problems.map((problem) => (
                <option key={problem.id} value={problem.title} className="bg-[#15151A]">
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>

          {/* ROOM SUMMARY */}
          {roomConfig.problem && (
            <div className="flex items-start gap-4 p-4 rounded-xl bg-brand-primary/5 border border-brand-primary/20 text-sm">
              <div className="p-2 rounded-lg bg-brand-primary/10">
                <Code2Icon className="size-5 text-brand-primary" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-brand-text">Room Summary</p>
                <div className="text-brand-muted flex flex-col gap-1">
                  <p>Problem: <span className="font-medium text-brand-text">{roomConfig.problem}</span></p>
                  <p>Format: <span className="font-medium text-brand-text">1-on-1 Interview Session</span></p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-brand-border/40 bg-brand-surface/20 flex items-center justify-end gap-3">
          <button 
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-brand-muted hover:text-brand-text hover:bg-brand-surface border border-transparent transition-colors" 
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-6 py-2.5 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:bg-brand-primary/90 hover:shadow-lg hover:shadow-brand-primary/25 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}
          >
            {isCreating ? (
              <LoaderIcon className="size-4 animate-spin" />
            ) : (
              <PlusIcon className="size-4" />
            )}
            {isCreating ? "Creating..." : "Create Session"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default CreateSessionModal;
