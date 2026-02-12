"use client";

import Image from "next/image";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ==========================================================================
   DATA
   ========================================================================== */

const MONTHLY_STREAMS = [
  { month: "Aug '25", streams: 6917 },
  { month: "Sep '25", streams: 10365 },
  { month: "Oct '25", streams: 17766 },
  { month: "Nov '25", streams: 20827 },
  { month: "Dec '25", streams: 28245 },
  { month: "Jan '26", streams: 39586 },
];

const FOLLOWER_GROWTH = [
  { month: "Aug", followers: 669 },
  { month: "Sep", followers: 1533 },
  { month: "Oct", followers: 2195 },
  { month: "Nov", followers: 2904 },
  { month: "Dec", followers: 3800 },
  { month: "Jan", followers: 5331 },
];

const TOP_EPISODES = [
  { guest: "Robert Greene", title: "Ego Traps, The Art of Control & How to Stay Irreplaceable", spotify: 17209, youtube: 560038, watchHours: 153092, date: "Oct '25" },
  { guest: "Dan Koe", title: "How To Get Ahead Of 99% Of People in 2026", spotify: 21806, youtube: 84838, watchHours: 11347, date: "Dec '25" },
  { guest: "George Heaton", title: "The Clothing Brand That Should've Died But Became a Cult", spotify: 18508, youtube: 81964, watchHours: 21526, date: "Nov '25" },
  { guest: "Kent Yoshimura", title: "The TikTok Strategy That's Printing MILLIONS", spotify: 3383, youtube: 85411, watchHours: 1071, date: "Jun '25" },
  { guest: "Caleb Ralston", title: "Personal Branding Masterclass: Beginner to Expert", spotify: 9643, youtube: 77718, watchHours: 1796, date: "Jul '25" },
  { guest: "Oren John", title: "The Most Valuable Marketing Conversation of 2025", spotify: 9234, youtube: 69589, watchHours: 2363, date: "Aug '25" },
  { guest: "Nick Shackelford", title: "The New Formula to Run Meta Ads in 2025", spotify: 4523, youtube: 69707, watchHours: 795, date: "Jun '25" },
  { guest: "Kallaway", title: "Content Masterclass: The Most Valuable 3 Hours", spotify: 7268, youtube: 53646, watchHours: 9268, date: "Jan '26" },
  { guest: "Sean Frank", title: "E-Commerce Masterclass: How to Build, Scale & Win", spotify: 8351, youtube: 31979, watchHours: 7000, date: "Dec '25" },
  { guest: "Samir Chaudry", title: "How To Actually Dominate YouTube in 2026", spotify: 5431, youtube: 33883, watchHours: 7724, date: "Jan '26" },
  { guest: "Roberto Nickson", title: "Why 99% of Creators Will Be Replaced by AI", spotify: 6754, youtube: 25326, watchHours: 772, date: "Sep '25" },
  { guest: "Mark Manson", title: "When Quitting Is the Smartest Business Move", spotify: 6562, youtube: 10340, watchHours: 2635, date: "Dec '25" },
];

const AGE_DATA = [
  { range: "18–22", value: 5.1 },
  { range: "23–27", value: 22.3 },
  { range: "28–34", value: 38.2 },
  { range: "35–44", value: 25.8 },
  { range: "45–59", value: 7.3 },
  { range: "60+", value: 1.1 },
];

const GEO_DATA = [
  { country: "United States", value: 35.4 },
  { country: "United Kingdom", value: 14.1 },
  { country: "Australia", value: 9.0 },
  { country: "Canada", value: 6.9 },
  { country: "Germany", value: 3.3 },
  { country: "Netherlands", value: 2.9 },
  { country: "Other", value: 26.9 },
];

const PLATFORM_DATA = [
  { name: "Spotify", value: 84.1 },
  { name: "Apple Podcasts", value: 14.0 },
  { name: "Other", value: 1.9 },
];

const DEVICE_DATA = [
  { name: "iPhone", value: 81.1 },
  { name: "Android", value: 12.8 },
  { name: "Other", value: 6.1 },
];

const GENDER_DATA = [
  { name: "Male", value: 82.9 },
  { name: "Female", value: 14.6 },
  { name: "Other", value: 2.5 },
];

/* ==========================================================================
   COLORS
   ========================================================================== */

const CHART_BLACK = "#1a1a1a";
const CHART_GRAY = "#888";
const ACCENT = "#1a1a1a";
const ACCENT_LIGHT = "#e0e0e0";
const PIE_COLORS = ["#1a1a1a", "#888", "#ccc", "#ddd"];
const GEO_BAR = "#1a1a1a";

/* ==========================================================================
   HELPERS
   ========================================================================== */

function fmt(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toLocaleString();
}

function fmtFull(n: number): string {
  return n.toLocaleString();
}

/* ==========================================================================
   SHARED COMPONENTS
   ========================================================================== */

function CustomTooltip({
  active,
  payload,
  label,
  suffix = "",
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-neutral-200 rounded-lg px-3 py-2 shadow-lg text-sm">
        <p className="text-neutral-500 text-xs mb-0.5">{label}</p>
        <p className="font-semibold text-neutral-900">
          {fmtFull(payload[0].value)}
          {suffix}
        </p>
      </div>
    );
  }
  return null;
}

function StatCard({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/60">
      <p className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
        {value}
      </p>
      <p className="text-sm font-medium text-neutral-600 mt-1">{label}</p>
      <p className="text-xs text-neutral-400 mt-1">{sub}</p>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-neutral-500 mt-1 text-sm">{subtitle}</p>
      )}
    </div>
  );
}

/* ==========================================================================
   DONUT CHART (reusable)
   ========================================================================== */

function DonutChart({
  data,
  title,
}: {
  data: { name: string; value: number }[];
  title: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
        {title}
      </h3>
      <div className="flex items-center gap-6">
        <div className="w-32 h-32 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                dataKey="value"
                stroke="none"
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2 text-sm">
          {data.map((d, i) => (
            <div key={d.name} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: PIE_COLORS[i % PIE_COLORS.length],
                }}
              />
              <span className="text-neutral-600">{d.name}</span>
              <span className="font-semibold text-neutral-900 ml-auto">
                {d.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */

export default function MediaKit() {
  return (
    <main className="min-h-screen">
      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-neutral-200/80 backdrop-blur-xl bg-[#efefef]/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Image
            src="/logo.png"
            alt="Open Residency"
            width={200}
            height={24}
            className="h-5 md:h-6 w-auto"
            priority
          />
          <span className="text-xs md:text-sm text-neutral-400 font-medium tracking-wide">
            Media Kit&ensp;/&ensp;February 2026
          </span>
        </div>
      </nav>

      {/* ── BANNER ───────────────────────────────────────────────────── */}
      <div className="w-full">
        <Image
          src="/banner.jpg"
          alt="Open Residency — podcast studio"
          width={1920}
          height={720}
          className="w-full h-48 md:h-72 lg:h-96 object-cover"
          priority
        />
      </div>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-14 md:pt-20 pb-12">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-4">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400">
              Cross-Platform Podcast Analytics
            </p>
            <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-neutral-900 text-white">
              Last 6 Months
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
            Building the #1 podcast
            <br />
            for founders &amp;&nbsp;operators
          </h1>
          <p className="text-lg text-neutral-500 leading-relaxed max-w-2xl">
            Open Residency is a long-form interview podcast featuring
            world-class entrepreneurs, creators, and thought leaders. In the
            last 6 months alone, we&apos;ve generated over 1.8 million views
            across YouTube and all major podcast platforms with explosive
            month-over-month growth.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            value="1.8M+"
            label="Cross-Platform Views"
            sub="YouTube + All Podcast Platforms"
          />
          <StatCard
            value="255K+"
            label="Watch Hours"
            sub="YouTube (6-month period)"
          />
          <StatCard
            value="27.5K"
            label="YouTube Subscribers"
            sub="Gained in 6 months"
          />
          <StatCard
            value="5,371"
            label="Spotify Followers"
            sub="8x growth since Aug '25"
          />
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-neutral-200" />
      </div>

      {/* ── MONTHLY GROWTH ──────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader
          title="Monthly Growth"
          subtitle="Spotify streams & downloads — Last 6 months (Aug '25 – Jan '26)"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_STREAMS}>
                  <defs>
                    <linearGradient
                      id="streamGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={ACCENT} stopOpacity={0.12} />
                      <stop
                        offset="100%"
                        stopColor={ACCENT}
                        stopOpacity={0.01}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e5e5"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: CHART_GRAY, fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: CHART_GRAY, fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => fmt(v)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="streams"
                    stroke={CHART_BLACK}
                    strokeWidth={2.5}
                    fill="url(#streamGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sidebar stats */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
              <p className="text-4xl font-bold">472%</p>
              <p className="text-sm text-neutral-500 mt-1">
                Stream growth Aug → Jan
              </p>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-neutral-400">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-900" />
                6,917 → 39,586 monthly streams
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
              <p className="text-4xl font-bold">8x</p>
              <p className="text-sm text-neutral-500 mt-1">
                Spotify follower growth
              </p>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-neutral-400">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-900" />
                669 → 5,371 followers
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={FOLLOWER_GROWTH}>
                    <defs>
                      <linearGradient
                        id="followerGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={ACCENT}
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="100%"
                          stopColor={ACCENT}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="followers"
                      stroke={CHART_BLACK}
                      strokeWidth={2}
                      fill="url(#followerGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Spotify follower trajectory
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-neutral-200" />
      </div>

      {/* ── TOP EPISODES ────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader
          title="Top Episodes"
          subtitle="Cross-platform performance (last 6 months) — Spotify streams + YouTube views"
        />

        <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 text-neutral-400 text-xs uppercase tracking-wider">
                  <th className="text-left py-4 px-6 font-semibold">#</th>
                  <th className="text-left py-4 px-4 font-semibold">Guest</th>
                  <th className="text-right py-4 px-4 font-semibold">
                    Total Views
                  </th>
                  <th className="text-right py-4 px-4 font-semibold hidden md:table-cell">
                    Spotify
                  </th>
                  <th className="text-right py-4 px-4 font-semibold hidden md:table-cell">
                    YouTube
                  </th>
                  <th className="text-right py-4 px-4 font-semibold hidden lg:table-cell">
                    Watch Hours
                  </th>
                  <th className="text-right py-4 px-6 font-semibold hidden lg:table-cell">
                    Published
                  </th>
                </tr>
              </thead>
              <tbody>
                {TOP_EPISODES.map((ep, i) => {
                  const total = ep.spotify + ep.youtube;
                  return (
                    <tr
                      key={ep.guest}
                      className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-neutral-100 text-xs font-bold text-neutral-500">
                          {i + 1}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-semibold text-neutral-900">
                          {ep.guest}
                        </p>
                        <p className="text-xs text-neutral-400 mt-0.5 max-w-xs truncate">
                          {ep.title}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-neutral-900 tabular-nums">
                        {fmt(total)}
                      </td>
                      <td className="py-4 px-4 text-right text-neutral-500 tabular-nums hidden md:table-cell">
                        {fmt(ep.spotify)}
                      </td>
                      <td className="py-4 px-4 text-right text-neutral-500 tabular-nums hidden md:table-cell">
                        {fmt(ep.youtube)}
                      </td>
                      <td className="py-4 px-4 text-right text-neutral-400 tabular-nums hidden lg:table-cell">
                        {fmtFull(ep.watchHours)}
                      </td>
                      <td className="py-4 px-6 text-right text-neutral-400 hidden lg:table-cell">
                        {ep.date}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-neutral-200" />
      </div>

      {/* ── YOUTUBE PERFORMANCE ─────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader
          title="YouTube Performance"
          subtitle="Channel analytics — Last 6 months (Aug '25 – Feb '26)"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { v: "1.37M", l: "Total Views" },
            { v: "1.21M", l: "Engaged Views" },
            { v: "255.5K", l: "Watch Hours" },
            { v: "15.2M", l: "Impressions" },
            { v: "4.1%", l: "Click-Through Rate" },
            { v: "27,457", l: "Subscribers Gained" },
          ].map((s) => (
            <div
              key={s.l}
              className="bg-white rounded-xl border border-neutral-200/60 shadow-sm p-4"
            >
              <p className="text-xl md:text-2xl font-bold">{s.v}</p>
              <p className="text-xs text-neutral-400 mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Long-form */}
          <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
              Long-Form Episodes (22)
            </h3>
            <div className="space-y-3">
              {TOP_EPISODES.slice(0, 6).map((ep, i) => {
                const maxViews = TOP_EPISODES[0].youtube;
                const pct = (ep.youtube / maxViews) * 100;
                return (
                  <div key={ep.guest}>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-sm font-medium text-neutral-700 truncate max-w-[70%]">
                        <span className="text-neutral-400 mr-1.5">
                          {i + 1}.
                        </span>
                        {ep.guest}
                      </span>
                      <span className="text-sm font-semibold tabular-nums">
                        {fmt(ep.youtube)}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-100 rounded-full h-1.5">
                      <div
                        className="bg-neutral-900 h-1.5 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shorts + Engagement */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
                Shorts (198 clips)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold">413K</p>
                  <p className="text-xs text-neutral-400">Total Views</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">11K</p>
                  <p className="text-xs text-neutral-400">Total Likes</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
                Engagement
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold">49.8K</p>
                  <p className="text-xs text-neutral-400">Total Likes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">3.3K</p>
                  <p className="text-xs text-neutral-400">Comments</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">12:38</p>
                  <p className="text-xs text-neutral-400">Avg View Duration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-neutral-200" />
      </div>

      {/* ── AUDIENCE DEMOGRAPHICS ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader
          title="Audience Profile"
          subtitle="Listener demographics across all podcast platforms — Last 6 months"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gender */}
          <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <DonutChart data={GENDER_DATA} title="Gender" />
          </div>

          {/* Age */}
          <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
              Age Distribution
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={AGE_DATA} layout="vertical">
                  <XAxis
                    type="number"
                    tick={{ fill: CHART_GRAY, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <YAxis
                    type="category"
                    dataKey="range"
                    tick={{ fill: "#666", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={50}
                  />
                  <Tooltip content={<CustomTooltip suffix="%" />} />
                  <Bar dataKey="value" fill={CHART_BLACK} radius={[0, 4, 4, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-neutral-400 mt-2 text-center">
              <span className="font-semibold text-neutral-600">86.3%</span>{" "}
              core demographic (ages 23–44)
            </p>
          </div>

          {/* Geography */}
          <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
              Geography
            </h3>
            <div className="space-y-2.5">
              {GEO_DATA.map((g) => (
                <div key={g.country}>
                  <div className="flex items-baseline justify-between text-sm mb-1">
                    <span className="text-neutral-600">{g.country}</span>
                    <span className="font-semibold tabular-nums">
                      {g.value}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${(g.value / 35.4) * 100}%`,
                        backgroundColor: GEO_BAR,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-neutral-200" />
      </div>

      {/* ── PLATFORM & DEVICE BREAKDOWN ─────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader
          title="Platform & Device Breakdown"
          subtitle="Where and how listeners consume Open Residency"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <DonutChart data={PLATFORM_DATA} title="Podcast Apps" />
          </div>
          <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <DonutChart data={DEVICE_DATA} title="Devices" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="border-t border-neutral-200 mt-8">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <Image
            src="/logo.png"
            alt="Open Residency"
            width={160}
            height={20}
            className="h-4 w-auto opacity-40"
          />
          <p className="text-xs text-neutral-400 text-center md:text-right">
            Last updated February 12, 2026 &middot; Instagram analytics coming
            soon
          </p>
        </div>
      </footer>
    </main>
  );
}
