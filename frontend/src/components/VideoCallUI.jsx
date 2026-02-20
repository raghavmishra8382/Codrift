import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
  useCall,
} from "@stream-io/video-react-sdk";
import { Loader2Icon, MessageSquareIcon, UsersIcon, XIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Channel,
  Chat,
  MessageComposer,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/index.css";

function VideoCallUI({ chatClient, channel }) {
  const navigate = useNavigate();
  const call = useCall();
  const { useCallCallingState, useParticipantCount, useDominantSpeaker } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const dominantSpeaker = useDominantSpeaker();
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!channel) return;

    const handleNewMessage = (e) => {
      if (e.message.user.id !== chatClient.userID && !isChatOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    };

    channel.on('message.new', handleNewMessage);
    
    return () => {
      channel.off('message.new', handleNewMessage);
    };
  }, [channel, chatClient.userID, isChatOpen]);

  useEffect(() => {
    if (isChatOpen) {
      setUnreadCount(0);
      if (channel) {
        channel.markRead();
      }
    }
  }, [isChatOpen, channel]);

  const handleLeaveCall = async () => {
    try {
      if (call) {
        await call.leave();
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error leaving call:", error);
      navigate("/dashboard");
    }
  };

  if (callingState === CallingState.JOINING) {
    return (
      <div className="h-full flex items-center justify-center text-brand-text">
        <div className="text-center">
          <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-brand-primary mb-4" />
          <p className="text-lg font-medium">Joining call...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex gap-3 relative str-video min-h-0 bg-brand-bg rounded-xl">
      <div className="flex-1 flex flex-col gap-3 min-h-0">
        <div className="flex items-center justify-between gap-2 bg-brand-surface/50 p-3 rounded-xl shadow-sm border border-brand-border/60">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                <UsersIcon className="w-4 h-4 text-brand-primary" />
              </div>
              <span className="font-semibold text-brand-text text-sm">
                {participantCount} {participantCount === 1 ? "Participant" : "Participants"}
              </span>
            </div>
            
            {dominantSpeaker?.name && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-green-400">{dominantSpeaker.name} is speaking</span>
              </div>
            )}
          </div>

          {chatClient && channel && (
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`px-3 py-1.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                isChatOpen
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                  : "bg-brand-surface border border-brand-border/60 text-brand-text hover:bg-brand-surface/80 hover:border-brand-primary/50"
              }`}
              title={isChatOpen ? "Hide chat" : "Show chat"}
            >
              <MessageSquareIcon className="size-4" />
              {unreadCount > 0 && !isChatOpen ? `Chat (${unreadCount})` : "Chat"}
            </button>
          )}
        </div>

        <div className="flex-1 min-h-0 bg-black/40 rounded-xl overflow-hidden relative border border-brand-border/60 shadow-inner">
          <SpeakerLayout />
        </div>

        <div className="bg-brand-surface/50 p-3 rounded-xl shadow-sm border border-brand-border/60 flex justify-center gap-3">
          <CallControls onLeave={handleLeaveCall} />
        </div>
      </div>

      {chatClient && channel && (
        <div
          className={`absolute right-0 top-0 bottom-0 z-50 flex flex-col rounded-xl shadow-2xl overflow-hidden bg-brand-surface border-brand-border/60 transition-all duration-300 ease-in-out ${
            isChatOpen ? "w-80 opacity-100 border-l" : "w-0 opacity-0 border-0"
          }`}
        >
          {isChatOpen && (
            <>
              <div className="bg-brand-surface p-3 border-b border-brand-border/60 flex items-center justify-between">
                <h3 className="font-bold text-brand-text text-sm uppercase tracking-wider">Session Chat</h3>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-brand-muted hover:text-brand-text transition-colors p-1 rounded-md hover:bg-brand-surface/80"
                  title="Close chat"
                >
                  <XIcon className="size-4" />
                </button>
              </div>
              <div className="flex-1 min-h-0 bg-brand-bg/50 str-chat__theme-dark">
                <Chat client={chatClient} theme="str-chat__theme-dark">
                  <Channel channel={channel}>
                    <Window>
                      <MessageList />
                      <MessageComposer />
                    </Window>
                    <Thread />
                  </Channel>
                </Chat>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default VideoCallUI;
