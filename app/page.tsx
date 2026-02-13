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

const MONTHLY_YT_VIEWS = [
  { month: "Aug '25", views: 100028 },
  { month: "Sep '25", views: 58118 },
  { month: "Oct '25", views: 290417 },
  { month: "Nov '25", views: 239807 },
  { month: "Dec '25", views: 180068 },
  { month: "Jan '26", views: 242666 },
];

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
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="https://www.openresidency.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9 9 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
              Website
            </a>
            <a href="https://www.youtube.com/@openresidency" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              YouTube
            </a>
            <a href="https://open.spotify.com/show/5SPMRnD4iKSHKcTl4mMqbM" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              Spotify
            </a>
            <a href="https://podcasts.apple.com/us/podcast/open-residency/id1791782856" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.08 1.132 1.756 2.42 2.004 3.821.072.407-.208.793-.615.865a.746.746 0 01-.865-.616c-.2-1.13-.744-2.17-1.616-3.083-1.324-1.39-3.063-2.13-5.02-2.13-1.89 0-3.652.753-4.953 2.12-.868.913-1.416 1.958-1.628 3.108-.074.407-.467.676-.873.603a.746.746 0 01-.603-.873c.262-1.42.94-2.722 2.014-3.852 1.615-1.695 3.79-2.55 6.099-2.55zm-.043 3.519c1.7 0 3.279.653 4.449 1.869.757.788 1.252 1.72 1.472 2.765a.747.747 0 01-1.46.312c-.163-.775-.53-1.462-1.092-2.048-.863-.898-2.03-1.38-3.373-1.38-1.309 0-2.494.494-3.35 1.39-.556.582-.92 1.266-1.08 2.036a.747.747 0 01-1.46-.318c.215-1.038.707-1.964 1.462-2.748 1.155-1.212 2.753-1.878 4.432-1.878zM12 11.15a2.647 2.647 0 00-2.644 2.644c0 .626.221 1.2.59 1.652l-.546 3.014a.79.79 0 00.627.919l.075.008h3.773a.79.79 0 00.703-.785v-.143l-.546-3.014a2.63 2.63 0 00.59-1.651A2.647 2.647 0 0012 11.15z"/></svg>
              Apple Podcasts
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            value="1.8M+"
            label="Cross-Platform Views"
            sub="YouTube + All Podcast Platforms"
          />
          <StatCard
            value="15.2M"
            label="YouTube Impressions"
            sub="Thumbnail impressions served"
          />
          <StatCard
            value="255K+"
            label="Watch Hours"
            sub="YouTube (last 6 months)"
          />
          <StatCard
            value="27,457"
            label="YouTube Subscribers"
            sub="Gained in last 6 months"
          />
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

        {/* Key stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          {[
            { v: "1.37M", l: "Total Views" },
            { v: "1.21M", l: "Engaged Views" },
            { v: "255.5K", l: "Watch Hours" },
            { v: "15.2M", l: "Impressions" },
            { v: "4.1%", l: "Click-Through Rate" },
            { v: "27,457", l: "Subscribers Gained" },
            { v: "406K", l: "Premium Views" },
            { v: "58.7%", l: "Stay-to-Watch Rate" },
          ].map((s) => (
            <div
              key={s.l}
              className="bg-white rounded-xl border border-neutral-200/60 shadow-sm p-4"
            >
              <p className="text-lg md:text-xl font-bold">{s.v}</p>
              <p className="text-[11px] text-neutral-400 mt-0.5 leading-tight">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Monthly views chart + top videos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
              Monthly Engaged Views
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_YT_VIEWS}>
                  <defs>
                    <linearGradient id="ytGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={ACCENT} stopOpacity={0.12} />
                      <stop offset="100%" stopColor={ACCENT} stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: CHART_GRAY, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: CHART_GRAY, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => fmt(v)} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="views" stroke={CHART_BLACK} strokeWidth={2.5} fill="url(#ytGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sidebar highlights */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
              <p className="text-4xl font-bold">290K</p>
              <p className="text-sm text-neutral-500 mt-1">
                Peak month (Oct &apos;25)
              </p>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-neutral-400">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-900" />
                Robert Greene episode drove viral spike
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
              <p className="text-4xl font-bold">22</p>
              <p className="text-sm text-neutral-500 mt-1">
                Long-form episodes
              </p>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-neutral-400">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-900" />
                + 198 short-form clips
              </div>
            </div>
          </div>
        </div>

        {/* Shorts + Engagement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              Engagement (All YouTube Content)
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
                <p className="text-2xl font-bold">14.8%</p>
                <p className="text-xs text-neutral-400">Avg % Viewed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-neutral-200" />
      </div>

      {/* ── PODCAST GROWTH (SPOTIFY) ────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader
          title="Podcast Growth"
          subtitle="Spotify streams & downloads — Last 6 months (Aug '25 – Jan '26)"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_STREAMS}>
                  <defs>
                    <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={ACCENT} stopOpacity={0.12} />
                      <stop offset="100%" stopColor={ACCENT} stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: CHART_GRAY, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: CHART_GRAY, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => fmt(v)} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="streams" stroke={CHART_BLACK} strokeWidth={2.5} fill="url(#streamGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
              <p className="text-4xl font-bold">472%</p>
              <p className="text-sm text-neutral-500 mt-1">Stream growth Aug → Jan</p>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-neutral-400">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-900" />
                6,917 → 39,586 monthly streams
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
              <p className="text-4xl font-bold">8x</p>
              <p className="text-sm text-neutral-500 mt-1">Spotify follower growth</p>
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
                      <linearGradient id="followerGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={ACCENT} stopOpacity={0.1} />
                        <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="followers" stroke={CHART_BLACK} strokeWidth={2} fill="url(#followerGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-neutral-400 mt-1">Spotify follower trajectory</p>
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
          <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <DonutChart data={GENDER_DATA} title="Gender" />
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
              Age Distribution
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={AGE_DATA} layout="vertical">
                  <XAxis type="number" tick={{ fill: CHART_GRAY, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="range" tick={{ fill: "#666", fontSize: 12 }} axisLine={false} tickLine={false} width={50} />
                  <Tooltip content={<CustomTooltip suffix="%" />} />
                  <Bar dataKey="value" fill={CHART_BLACK} radius={[0, 4, 4, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-neutral-400 mt-2 text-center">
              <span className="font-semibold text-neutral-600">86.3%</span> core demographic (ages 23–44)
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
              Geography
            </h3>
            <div className="space-y-2.5">
              {GEO_DATA.map((g) => (
                <div key={g.country}>
                  <div className="flex items-baseline justify-between text-sm mb-1">
                    <span className="text-neutral-600">{g.country}</span>
                    <span className="font-semibold tabular-nums">{g.value}%</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: `${(g.value / 35.4) * 100}%`, backgroundColor: GEO_BAR }} />
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
            Last updated February 12, 2026 &middot; Instagram analytics coming soon
          </p>
        </div>
      </footer>
    </main>
  );
}
