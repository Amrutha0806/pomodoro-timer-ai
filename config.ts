import React from 'react';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useGetSessions } from '../hooks/useQueries';
import { formatDateTime, formatDuration, getLast7DaysData } from '../utils/dateHelpers';
import StreakBadge from './StreakBadge';
import BadgeCollection from './BadgeCollection';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Clock, Flame, Target, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const { data: profile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: sessions = [], isLoading: sessionsLoading } = useGetSessions();

  const isLoading = profileLoading || sessionsLoading;

  const totalPomodoros = Number(profile?.totalPomodoros ?? 0);
  const totalFocusTime = Number(profile?.totalFocusTime ?? 0);
  const currentStreak = Number(profile?.streak?.currentStreak ?? 0);
  const highestStreak = Number(profile?.streak?.highestStreak ?? 0);
  const milestones = profile?.streak?.milestones ?? [];

  const chartData = getLast7DaysData(sessions);
  const maxCount = Math.max(...chartData.map((d) => d.count), 1);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 rounded-3xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          emoji="🍅"
          label="Total Pomodoros"
          value={String(totalPomodoros)}
          icon={<Target size={18} className="text-primary" />}
        />
        <StatCard
          emoji="⏱️"
          label="Focus Time"
          value={formatDuration(totalFocusTime)}
          icon={<Clock size={18} className="text-primary" />}
        />
        <StatCard
          emoji="🔥"
          label="Current Streak"
          value={
            <StreakBadge streak={currentStreak} size="sm" />
          }
          icon={<Flame size={18} className="text-orange-500" />}
        />
        <StatCard
          emoji="🏆"
          label="Best Streak"
          value={`${highestStreak} days`}
          icon={<TrendingUp size={18} className="text-primary" />}
        />
      </div>

      {/* Weekly Chart */}
      <div className="bg-card rounded-3xl p-4 shadow-cute border border-border/50">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <span>📊</span> Last 7 Days
        </h3>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={chartData} barSize={24}>
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fontFamily: 'Nunito', fill: 'oklch(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide domain={[0, maxCount + 1]} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                fontFamily: 'Nunito',
                fontSize: 12,
              }}
              formatter={(value: number) => [`${value} 🍅`, 'Pomodoros']}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.count > 0 ? 'oklch(var(--primary))' : 'oklch(var(--muted))'}
                  fillOpacity={entry.count > 0 ? 0.85 : 0.4}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Badge Collection */}
      <div className="bg-card rounded-3xl p-4 shadow-cute border border-border/50">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <span>🏅</span> Badge Collection
        </h3>
        <BadgeCollection currentStreak={currentStreak} milestones={milestones} />
      </div>

      {/* Session History */}
      <div className="bg-card rounded-3xl p-4 shadow-cute border border-border/50">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <span>📋</span> Session History
          <span className="ml-auto text-xs text-muted-foreground font-normal">
            {sessions.length} sessions
          </span>
        </h3>

        {sessions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-4xl mb-2">🌱</div>
            <p className="text-sm font-medium">No sessions yet!</p>
            <p className="text-xs mt-1">Complete your first Pomodoro to see history here.</p>
          </div>
        ) : (
          <ScrollArea className="h-64">
            <div className="space-y-2 pr-2">
              {[...sessions].reverse().map((session, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm shrink-0">
                    🍅
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-foreground truncate">
                      {session.taskName || 'Untitled session'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(session.completedAt)} · {formatDuration(session.focusDuration)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}

function StatCard({
  emoji,
  label,
  value,
  icon,
}: {
  emoji: string;
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-card rounded-3xl p-4 shadow-cute border border-border/50 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xl">{emoji}</span>
        {icon}
      </div>
      <div>
        <div className="font-bold text-lg text-foreground leading-tight">
          {typeof value === 'string' ? value : value}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      </div>
    </div>
  );
}
