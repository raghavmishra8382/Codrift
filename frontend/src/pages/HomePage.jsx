import { Link } from "react-router";
import {
  ArrowRightIcon,
  Code2Icon,
  ZapIcon,
  VideoIcon,
  UsersIcon,
  TerminalIcon,
  ShieldIcon,
  ClockIcon,
  ChevronRightIcon
} from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function HomePage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-primary/30 flex flex-col">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-brand-bg/80 border-b border-brand-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="size-9 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Code2Icon className="size-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-brand-text">
              Codrift
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-muted">
            <a href="#features" className="hover:text-brand-text transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-brand-text transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-brand-text transition-colors">Pricing</a>
            <a href="#docs" className="hover:text-brand-text transition-colors">Docs</a>
          </div>

          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal" afterSignInUrl="/dashboard" afterSignUpUrl="/dashboard">
                <button className="text-sm font-medium text-brand-muted hover:text-brand-text transition-colors hidden sm:block">
                  Login
                </button>
              </SignInButton>
              <SignInButton mode="modal" afterSignInUrl="/dashboard" afterSignUpUrl="/dashboard">
                <button className="px-4 py-2 rounded-lg bg-brand-text text-brand-bg font-semibold text-sm hover:bg-brand-text/90 transition-colors">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold text-sm shadow-lg hover:shadow-brand-primary/25 hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                Open Workspace <ArrowRightIcon className="size-4" />
              </Link>
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 bg-brand-bg">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-primary/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary text-sm font-medium mb-6"
          >
            <ZapIcon className="size-4" />
            <span>Built for Modern Technical Interviews</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-text via-brand-text to-brand-muted max-w-5xl mx-auto"
          >
            Conduct Better
            <br />
            Technical Interviews.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-brand-muted max-w-2xl mx-auto font-light leading-relaxed"
          >
            Live coding, HD video calls, collaborative editing, chat, and multi-language execution—all in one seamless workspace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <SignedOut>
              <SignInButton mode="modal" afterSignInUrl="/dashboard">
                <button className="px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold hover:bg-brand-primary/90 hover:shadow-xl hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2">
                  Start Interview
                  <ArrowRightIcon className="size-4" />
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link to="/dashboard" className="px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold hover:bg-brand-primary/90 hover:shadow-xl hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2">
                Start Interview
                <ArrowRightIcon className="size-4" />
              </Link>
            </SignedIn>
            <button
              onClick={() => toast('Demo coming soon!')}
              className="px-6 py-3 rounded-xl border border-brand-border bg-brand-surface text-brand-text font-semibold hover:bg-brand-border hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <VideoIcon className="size-4" />
              View Demo
            </button>
          </motion.div>

          {/* CSS Product Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 w-full max-w-5xl mx-auto relative perspective-1000"
          >
            {/* Glow behind mockup */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent blur-3xl -z-10" />
            
            <div className="rounded-2xl border border-brand-border/60 bg-brand-surface/60 backdrop-blur-xl overflow-hidden shadow-2xl shadow-brand-primary/10 ring-1 ring-white/5">
              
              {/* Mockup Header */}
              <div className="h-12 border-b border-brand-border/60 flex items-center justify-between px-4 bg-black/40">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="size-3 rounded-full bg-red-500/80 border border-red-500/50" />
                    <div className="size-3 rounded-full bg-yellow-500/80 border border-yellow-500/50" />
                    <div className="size-3 rounded-full bg-green-500/80 border border-green-500/50" />
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-black/50 border border-brand-border text-xs text-brand-muted font-medium">
                    <Code2Icon className="size-3 text-brand-secondary" />
                    Interview with Alex
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-xs font-medium text-brand-muted">
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex size-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full size-2 bg-green-500"></span>
                    </span>
                    Live
                  </div>
                  <div className="font-mono bg-black/30 px-2 py-0.5 rounded border border-brand-border/50">00:45:12</div>
                  <div className="bg-brand-primary/20 text-brand-primary px-2 py-0.5 rounded border border-brand-primary/30">JavaScript</div>
                </div>
              </div>
              
              {/* Mockup Body */}
              <div className="flex h-[400px] md:h-[500px]">
                {/* Editor Area */}
                <div className="flex-1 flex flex-col border-r border-brand-border/60">
                  <div className="flex-1 p-6 font-mono text-sm overflow-hidden bg-[#0A0A0C] relative">
                    {/* Blurry Vignette effect */}
                    <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] pointer-events-none" />
                    
                    <div className="flex gap-4">
                      <div className="text-brand-muted/30 select-none text-right font-medium">
                        1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7
                      </div>
                      <div className="text-brand-text/90 font-medium">
                        <span className="text-pink-400">function</span> <span className="text-blue-400">twoSum</span>(nums, target) {'{'}<br/>
                        &nbsp;&nbsp;<span className="text-pink-400">const</span> map = <span className="text-pink-400">new</span> <span className="text-blue-400">Map</span>();<br/>
                        &nbsp;&nbsp;<span className="text-pink-400">for</span> (<span className="text-pink-400">let</span> i = <span className="text-orange-400">0</span>; i {'<'} nums.length; i++) {'{'}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">const</span> complement = target - nums[i];<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">if</span> (map.has(complement)) {'{'}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">return</span> [map.get(complement), i];<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/>
                        <span className="animate-pulse border-r-2 border-brand-primary inline-block w-1 h-4 ml-1 align-middle" />
                      </div>
                    </div>
                  </div>
                  {/* Console */}
                  <div className="h-1/3 border-t border-brand-border/60 bg-black/60 p-4 font-mono text-xs text-brand-muted backdrop-blur-md">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-2 text-brand-text font-semibold">
                        <TerminalIcon className="size-4" /> Console Output
                      </div>
                      <span className="text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">All Tests Passed</span>
                    </div>
                    <div className="space-y-1.5 opacity-80">
                      <div>> Compiling JavaScript...</div>
                      <div>> Running Test Case 1: <span className="text-green-400">PASS (2ms)</span></div>
                      <div>> Running Test Case 2: <span className="text-green-400">PASS (1ms)</span></div>
                      <div>> Running Test Case 3: <span className="text-green-400">PASS (3ms)</span></div>
                    </div>
                  </div>
                </div>

                {/* Sidebar (Video / Chat) */}
                <div className="w-64 md:w-80 flex flex-col bg-[#050505]/80">
                  {/* Video Grid */}
                  <div className="h-1/2 p-3 flex flex-col gap-3">
                    <div className="flex-1 rounded-xl bg-brand-surface border border-brand-border/60 relative overflow-hidden flex items-center justify-center shadow-inner">
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-md rounded text-[10px] font-medium border border-white/10 flex items-center gap-1.5">
                        <div className="size-1.5 rounded-full bg-green-500" /> Sarah (Interviewer)
                      </div>
                      <UsersIcon className="size-8 text-brand-muted/20" />
                    </div>
                    <div className="flex-1 rounded-xl bg-brand-surface border border-brand-border/60 relative overflow-hidden flex items-center justify-center shadow-inner ring-1 ring-brand-primary/20">
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-md rounded text-[10px] font-medium border border-white/10 flex items-center gap-1.5">
                        <div className="size-1.5 rounded-full bg-green-500" /> Alex (Candidate)
                      </div>
                      <UsersIcon className="size-8 text-brand-muted/20" />
                    </div>
                  </div>
                  {/* Chat */}
                  <div className="flex-1 border-t border-brand-border/60 p-3 flex flex-col">
                    <div className="flex-1 flex flex-col justify-end space-y-2 mb-3">
                      <div className="bg-brand-surface border border-brand-border/50 p-2.5 rounded-lg rounded-tl-none text-[11px] w-5/6 text-brand-text shadow-sm">
                        Can you optimize the space complexity?
                      </div>
                      <div className="bg-brand-primary/20 border border-brand-primary/30 p-2.5 rounded-lg rounded-tr-none text-[11px] w-5/6 self-end text-brand-text shadow-sm">
                        Yes, I will use a Hash Map!
                      </div>
                      <div className="text-[9px] text-brand-muted self-end mr-1 italic">Alex is typing...</div>
                    </div>
                    <div className="h-9 rounded-md bg-black/50 border border-brand-border flex items-center px-3 text-[11px] text-brand-muted">
                      Type a message...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Powered By Stack */}
      <section className="py-8 border-b border-brand-border/20 bg-brand-bg relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-sm font-medium text-brand-muted">
          <span>Powered by</span>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <span className="hover:text-brand-text transition-colors">React</span>
            <span className="hover:text-brand-text transition-colors">Node.js</span>
            <span className="hover:text-brand-text transition-colors">Socket.IO</span>
            <span className="hover:text-brand-text transition-colors">WebRTC</span>
            <span className="hover:text-brand-text transition-colors">Monaco</span>
            <span className="hover:text-brand-text transition-colors">MongoDB</span>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-brand-bg relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">How it Works</h2>
            <p className="text-brand-muted">A seamless flow from invite to evaluation.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-brand-border -translate-y-1/2 -z-10" />
            
            {[
              { step: "1", title: "Create Interview", desc: "Instantly spin up a secure workspace." },
              { step: "2", title: "Invite Candidate", desc: "Share a unique, one-time secure link." },
              { step: "3", title: "Collaborate Live", desc: "Pair program with zero latency." },
              { step: "4", title: "Evaluate & Hire", desc: "Run test cases and review performance." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center bg-brand-bg md:bg-transparent p-6 rounded-xl border border-brand-border md:border-none"
              >
                <div className="size-12 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-lg font-bold text-brand-primary mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-brand-muted">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features (Bento Grid) */}
      <section id="features" className="py-24 bg-[#111116] border-y border-brand-border/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Everything you need for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">technical interviews.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[340px] gap-6">
          
          {/* Large Card 1: Editor (Span 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group md:col-span-2 rounded-3xl bg-brand-surface/30 border border-brand-border/60 hover:border-brand-primary/50 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500 overflow-hidden relative flex flex-col md:flex-row"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex-1 p-8 md:p-10 z-10 flex flex-col justify-center">
              <div className="size-12 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center mb-6 shadow-sm">
                <Code2Icon className="size-6 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Collaborative Monaco Editor</h3>
              <p className="text-brand-muted leading-relaxed mb-6">Experience flawless real-time conflict resolution, syntax highlighting, and intelligence powered by the exact same editor that runs VS Code.</p>
              
              <div className="mt-auto flex items-center gap-1 text-sm font-semibold text-brand-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Explore <ChevronRightIcon className="size-4" />
              </div>
            </div>
            
            <div className="flex-1 relative z-0 h-48 md:h-auto overflow-hidden bg-[#0A0A0C] border-t md:border-t-0 md:border-l border-brand-border/50 flex items-center justify-center p-6">
              {/* Mini Editor Visual */}
              <div className="w-full max-w-sm rounded-lg border border-brand-border/50 bg-[#111116] shadow-2xl flex flex-col overflow-hidden text-[10px] font-mono group-hover:scale-105 transition-transform duration-700">
                <div className="flex gap-1.5 p-2 border-b border-brand-border/50 bg-[#09090B]">
                  <div className="size-2 rounded-full bg-red-500/80" />
                  <div className="size-2 rounded-full bg-yellow-500/80" />
                  <div className="size-2 rounded-full bg-green-500/80" />
                </div>
                <div className="p-3 text-brand-text/80 space-y-1">
                  <div><span className="text-pink-400">export function</span> <span className="text-blue-400">solve</span>() {'{'}</div>
                  <div className="pl-4 text-brand-muted">
                    // Write your solution here<br/>
                    <span className="text-pink-400">const</span> result = <span className="text-orange-400">0</span>;
                  </div>
                  <div className="pl-4 relative inline-block">
                    <span className="text-pink-400">return</span> result;
                    {/* Fake cursor */}
                    <div className="absolute top-0 -right-1 h-full w-[2px] bg-brand-primary animate-pulse" />
                    <div className="absolute -top-4 left-6 bg-brand-primary text-white text-[8px] px-1 rounded rounded-bl-none shadow">Sarah</div>
                  </div>
                  <div>{'}'}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Large Card 2: Video (Span 1 col, 2 rows) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group md:col-span-1 md:row-span-2 rounded-3xl bg-brand-surface/30 border border-brand-border/60 hover:border-brand-primary/50 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500 overflow-hidden relative flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="p-8 md:p-10 z-10">
              <div className="size-12 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center mb-6 shadow-sm">
                <VideoIcon className="size-6 text-brand-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Real-Time Video</h3>
              <p className="text-brand-muted leading-relaxed">Crystal clear, ultra-low latency WebRTC calls built directly into your workspace. Never share an external meeting link again.</p>
              
              <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-brand-secondary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Explore <ChevronRightIcon className="size-4" />
              </div>
            </div>

            <div className="flex-1 relative z-0 min-h-64 p-6 flex flex-col gap-3 justify-end items-center border-t border-brand-border/50 bg-black/40">
              {/* Stacked Video Thumbnails */}
              <div className="w-full max-w-[200px] h-32 rounded-xl bg-[#111116] border border-brand-border/60 shadow-lg relative overflow-hidden flex items-center justify-center group-hover:-translate-y-2 group-hover:rotate-1 transition-transform duration-700">
                 <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 backdrop-blur rounded text-[9px] border border-white/10 flex items-center gap-1">
                   <div className="size-1.5 rounded-full bg-green-500" /> Alex
                 </div>
                 <UsersIcon className="size-6 text-brand-muted/30" />
              </div>
              <div className="w-full max-w-[200px] h-32 rounded-xl bg-[#15151A] border border-brand-border/60 shadow-lg relative overflow-hidden flex items-center justify-center group-hover:-translate-y-4 group-hover:-rotate-2 transition-transform duration-700">
                 <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 backdrop-blur rounded text-[9px] border border-white/10 flex items-center gap-1">
                   <div className="size-1.5 rounded-full bg-green-500" /> Sarah
                 </div>
                 <UsersIcon className="size-6 text-brand-muted/30" />
              </div>
            </div>
          </motion.div>

          {/* Small Card: Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group rounded-3xl bg-brand-surface/30 border border-brand-border/60 hover:border-brand-primary/50 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 p-8 flex flex-col relative overflow-hidden"
          >
            <div className="size-10 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center mb-5">
              <TerminalIcon className="size-5 text-brand-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">20+ Languages</h3>
            <p className="text-brand-muted text-sm flex-1">Execute code instantly. From Python to C++, we support all major runtimes in isolated execution environments.</p>
            <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Explore <ChevronRightIcon className="size-4" />
            </div>
          </motion.div>

          {/* Small Card: Sandboxes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group rounded-3xl bg-brand-surface/30 border border-brand-border/60 hover:border-brand-primary/50 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 p-8 flex flex-col relative overflow-hidden"
          >
            <div className="size-10 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center mb-5">
              <ShieldIcon className="size-5 text-brand-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Sandboxes</h3>
            <p className="text-brand-muted text-sm flex-1">Every code execution is sandboxed in a secure, ephemeral container, ensuring perfect isolation.</p>
            <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Explore <ChevronRightIcon className="size-4" />
            </div>
          </motion.div>

          {/* Small Card: Chat (Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="group md:col-span-2 rounded-3xl bg-brand-surface/30 border border-brand-border/60 hover:border-brand-primary/50 hover:shadow-2xl transition-all duration-300 p-8 flex flex-col md:flex-row items-center relative overflow-hidden gap-8"
          >
            <div className="flex-1">
              <div className="size-10 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center mb-5">
                <UsersIcon className="size-5 text-brand-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrated Live Chat</h3>
              <p className="text-brand-muted text-sm">Send snippets, links, and messages during the interview without ever leaving the workspace tab.</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Explore <ChevronRightIcon className="size-4" />
              </div>
            </div>
            {/* Visual Chat bubble */}
            <div className="hidden sm:flex flex-col gap-3 flex-1 opacity-70 group-hover:opacity-100 transition-opacity">
               <div className="bg-brand-surface border border-brand-border/50 p-3 rounded-2xl rounded-tl-none text-xs w-4/5 text-brand-muted">
                 Here is the link to the problem description.
               </div>
               <div className="bg-brand-primary/20 border border-brand-primary/30 p-3 rounded-2xl rounded-tr-none text-xs w-4/5 self-end text-brand-text">
                 Got it, I'll start by defining the class.
               </div>
            </div>
          </motion.div>

          {/* Small Card: Low Latency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="group rounded-3xl bg-brand-surface/30 border border-brand-border/60 hover:border-brand-primary/50 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 p-8 flex flex-col relative overflow-hidden"
          >
            <div className="size-10 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center mb-5">
              <ClockIcon className="size-5 text-brand-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Low Latency Sync</h3>
            <p className="text-brand-muted text-sm flex-1">Powered by WebSockets, cursor movements and keystrokes appear on the other side in milliseconds.</p>
            <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Explore <ChevronRightIcon className="size-4" />
            </div>
          </motion.div>

        </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-brand-bg relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-brand-border/50">
            {[
              { value: "20+", label: "Languages Supported" },
              { value: "<100ms", label: "Average Sync Latency" },
              { value: "HD", label: "WebRTC Calls" },
              { value: "Real-time", label: "Pair Programming" },
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-3xl md:text-5xl font-bold text-brand-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-brand-muted font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 bg-[#020202] border-t border-brand-border/30 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Code2Icon className="size-5 text-brand-primary" />
              <span className="text-lg font-bold tracking-tight text-brand-text">Codrift</span>
            </Link>
            <p className="text-sm text-brand-muted max-w-xs">
              Built for modern engineering teams to conduct flawless technical interviews.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-brand-text mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-brand-muted">
              <li><a href="#" className="hover:text-brand-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-brand-text mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-brand-muted">
              <li><a href="#" className="hover:text-brand-primary transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">API</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-brand-text mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-brand-muted">
              <li><a href="#" className="hover:text-brand-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-brand-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-brand-muted">© 2026 Codrift Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <div className="size-8 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center hover:text-brand-primary cursor-pointer transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </div>
            <div className="size-8 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center hover:text-brand-primary cursor-pointer transition-colors">
              <span className="sr-only">GitHub</span>
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;

