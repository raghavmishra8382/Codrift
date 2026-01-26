import { ActivityIcon, CheckCircle2Icon, UserPlusIcon, RocketIcon, LinkIcon } from "lucide-react";

function RecentActivity() {
  const activities = [
    {
      id: 1,
      title: "Completed Two Sum",
      time: "2h ago",
      icon: CheckCircle2Icon,
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "border-green-400/20"
    },
    {
      id: 2,
      title: "Alex joined session",
      time: "5h ago",
      icon: UserPlusIcon,
      color: "text-brand-primary",
      bg: "bg-brand-primary/10",
      border: "border-brand-primary/20"
    },
    {
      id: 3,
      title: "Invite link copied",
      time: "5h ago",
      icon: LinkIcon,
      color: "text-brand-secondary",
      bg: "bg-brand-secondary/10",
      border: "border-brand-secondary/20"
    },
    {
      id: 4,
      title: "Session created",
      time: "5h ago",
      icon: RocketIcon,
      color: "text-brand-muted",
      bg: "bg-brand-surface",
      border: "border-brand-border"
    }
  ];

  return (
    <div className="rounded-[20px] bg-gradient-to-br from-brand-surface/40 to-brand-bg border border-brand-border/60 shadow-lg transition-all duration-300 hover:shadow-brand-primary/20 hover:border-brand-primary/50 hover:-translate-y-2 relative group overflow-hidden flex flex-col h-full cursor-pointer">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl group-hover:bg-brand-primary/10 transition-colors pointer-events-none" />
      
      <div className="p-6 border-b border-brand-border/40 relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-surface border border-brand-border rounded-xl shadow-sm">
            <ActivityIcon className="w-5 h-5 text-brand-text" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-brand-text">Recent Activity</h2>
        </div>
      </div>

      <div className="p-6 relative z-10 flex-1">
        <div className="relative space-y-6 before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-border before:to-transparent">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="relative flex items-center gap-4">
                <div className={`relative z-10 flex items-center justify-center size-8 rounded-full ${activity.bg} border ${activity.border} shrink-0 shadow-sm`}>
                  <Icon className={`size-3.5 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0 flex flex-col pt-1">
                  <p className="text-sm font-semibold text-brand-text truncate">{activity.title}</p>
                  <p className="text-xs font-medium text-brand-muted">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RecentActivity;
