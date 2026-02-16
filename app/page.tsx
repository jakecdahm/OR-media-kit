"use client";

import Image from "next/image";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
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

const PUBLISHED_GUESTS = [
  { name: "Robert Greene", company: "Author", note: "48 Laws of Power" },
  { name: "Dee Murthy", company: "GHST", note: "9 figures" },
  { name: "Bill Shufelt", company: "Athletic Brewing", note: "9 figures" },
  { name: "Nate Checketts", company: "Rhone", note: "9 figures" },
  { name: "Ryan Bartlett", company: "True Classic", note: "9 figures" },
  { name: "Bryan Garafalow", company: "Skullcandy", note: "9 figures" },
  { name: "Sean Frank", company: "Ridge", note: "9 figures" },
  { name: "George Heaton", company: "Represent", note: "9 figures" },
  { name: "Kent Yoshimura", company: "NeuroGum", note: "9 figures" },
  { name: "Joel Kocher", company: "Humann", note: "9 figures" },
  { name: "Oliver Zak", company: "Mad Rabbit", note: "8 figures" },
  { name: "Manny Lubin", company: "Slate Milk", note: "8 figures" },
  { name: "Nick Shackelford", company: "Brez / Structured", note: "8 figures" },
  { name: "Simon Molnar", company: "Flagship.ai", note: "Family founded Afterpay" },
  { name: "Sahil Bloom", company: "Creator", note: "NYT Best Seller" },
  { name: "Mark Manson", company: "Author", note: "NYT Best Seller" },
  { name: "Dan Koe", company: "Creator", note: "Live Episode" },
  { name: "Samir", company: "Colin and Samir", note: "Live Episode" },
  { name: "Kane Kallaway", company: "Creator", note: "Live Episode" },
  { name: "Caleb Ralston", company: "Creator", note: "Hormozi / Vayner" },
  { name: "Oren John", company: "Creator", note: "Internet's Creative Director" },
  { name: "RPN", company: "Creator", note: "" },
];

const UPCOMING_GUESTS = [
  { name: "Taylor Holiday", company: "Common Thread Collective", note: "8 figures", filmed: true },
  { name: "Daniel Arsham", company: "Artist / Creator", note: "", filmed: false },
  { name: "Paddy Gallaway", company: "YouTube Strategist", note: "", filmed: false },
  { name: "Hormozi", company: "Acquisition.com", note: "", filmed: false },
  { name: "Simon Squibb", company: "Entrepreneur", note: "", filmed: false },
  { name: "Codie Sanchez", company: "Contrarian Thinking", note: "", filmed: false },
  { name: "Dom Iacavone", company: "RAW & more", note: "9 figures", filmed: false },
  { name: "Rob Dyrdek", company: "Dyrdek Machine", note: "", filmed: false },
  { name: "Marc Ecko", company: "Ecko", note: "", filmed: false },
  { name: "OMG Adrian", company: "Creator", note: "", filmed: false },
  { name: "Jeff Byers", company: "Momentous", note: "9 figures", filmed: false },
  { name: "Megan Lightcap", company: "Slow Ventures", note: "Creator Fund", filmed: false },
  { name: "Dan Martell", company: "SaaS Academy", note: "", filmed: false },
  { name: "Matt Gray", company: "Creator", note: "", filmed: false },
  { name: "Baseball Lifestyle", company: "", note: "9 figures", filmed: false },
  { name: "Alex Sobol", company: "Millennium", note: "9 figures", filmed: false },
  { name: "Geoffrey Woo", company: "Anti Fund", note: "", filmed: false },
  { name: "Chris Voss", company: "Author", note: "Never Split the Difference", filmed: false },
  { name: "Dad Gang", company: "", note: "8 figures", filmed: false },
  { name: "Bruno Casanovas", company: "Nude", note: "8 figures", filmed: false },
];

/* ==========================================================================
   COLORS
   ========================================================================== */

const CHART_BLACK = "#1a1a1a";
const CHART_GRAY = "#888";
const ACCENT = "#1a1a1a";
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

function GuestCard({
  name,
  company,
  note,
  filmed,
  upcoming,
}: {
  name: string;
  company?: string;
  note?: string;
  filmed?: boolean;
  upcoming?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-4 ${
        upcoming
          ? "border border-dashed border-neutral-300"
          : "border border-neutral-200/60"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-sm text-neutral-900">{name}</p>
          {company && (
            <p className="text-xs text-neutral-500 mt-0.5">{company}</p>
          )}
          {note && (
            <p className="text-[10px] text-neutral-400 mt-0.5">{note}</p>
          )}
        </div>
        {filmed && (
          <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-neutral-900 text-white flex-shrink-0">
            Filmed
          </span>
        )}
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
              Partnership Deck
            </p>
            <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-neutral-900 text-white">
              Last 6 Months
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
            The podcast for founders
            <br />
            &amp;&nbsp;operators
          </h1>
          <p className="text-lg text-neutral-500 leading-relaxed max-w-2xl">
            Open Residency is the long-form podcast for founders, operators, and
            brand builders. In 6 months, we&apos;ve generated 1.8M+ views
            across YouTube and all podcast platforms with 472% stream
            growth&nbsp;&mdash; and we&apos;re just getting started.
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            value="472%"
            label="Stream Growth"
            sub="Spotify streams Aug '25 → Jan '26"
          />
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-neutral-200" />
      </div>

      {/* ── ABOUT THE SHOW ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader title="About The Show" />

        <div className="max-w-3xl space-y-5">
          <p className="text-neutral-600 leading-relaxed">
            Open Residency is built on a simple belief: nothing accelerates
            growth like connecting with smart people who&apos;ve figured
            something out you haven&apos;t.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            Hosted by Mark Brazil&nbsp;&mdash; operator, investor, and
            creator&nbsp;&mdash; the show is an extension of how he&apos;s
            built his career: by learning from the best and putting it into
            practice. Mark is the CEO and co-founder of{" "}
            <span className="font-semibold text-neutral-900">IKONICK</span>,
            an 8-figure art licensing brand backed by GaryVee, Scooter Braun,
            and others, holding 50+ licenses including Michael Jordan, Muhammad
            Ali, Tiger Woods, Monopoly, and Peanuts. Previously, he served as
            CMO and Partner at{" "}
            <span className="font-semibold text-neutral-900">Melin</span>,
            helping scale the premium headwear brand to 9 figures.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            Now, after nearly a decade of building, Mark is sitting down with
            the operators, marketers, creators, and specialists he wants to
            learn from&nbsp;&mdash; diving deep into the tactical stuff. Not
            just what they&apos;ve built and why, but exactly how they&apos;ve
            done it.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            Open Residency is produced and owned by Mark&apos;s internal
            creative agency&nbsp;&mdash; the same team behind projects for{" "}
            <span className="font-semibold text-neutral-900">
              Leo Messi, Adidas, Nike, and MLB
            </span>
            . This show is their sole focus.
          </p>
          <div className="pt-2">
            <p className="text-neutral-900 font-semibold leading-relaxed">
              A partnership with Open Residency is not just media
              placement&nbsp;&mdash; it&apos;s a relationship with Mark and
              his network as a business development and sales machine.
            </p>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-neutral-200" />
      </div>

      {/* ── SOCIAL PROOF / PARTNERS ───────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader
          title="Our Partners"
          subtitle="Brands that trust Open Residency"
        />

        <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-8 md:p-10 mb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {[
              { name: "COMCAST", category: "CTV" },
              { name: "BEEHIIV", category: "Email" },
              { name: "K&L GATES", category: "Legal" },
              { name: "POPPY.AI", category: "AI" },
              { name: "MANYCHAT", category: "Messaging" },
              { name: "LINDY", category: "AI" },
            ].map((p) => (
              <div key={p.name} className="flex flex-col items-center justify-center py-3">
                <span className="text-base font-bold tracking-tight text-neutral-800">
                  {p.name}
                </span>
                <span className="text-[10px] text-neutral-400 mt-0.5 uppercase tracking-wider">
                  {p.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <blockquote className="text-neutral-600 italic leading-relaxed text-lg">
            &ldquo;He mentioned my name in passing on an episode and I got 4
            inbound calls and 2 blue chip clients.&rdquo;
          </blockquote>
          <p className="text-sm font-semibold text-neutral-900 mt-4">
            Tyler Denk
          </p>
          <p className="text-xs text-neutral-400">CEO, Beehiiv</p>
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-neutral-200" />
      </div>

      {/* ── BY THE NUMBERS ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader
          title="By The Numbers"
          subtitle="Cross-platform performance — Last 6 months (Aug '25 – Jan '26)"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            value="255K+"
            label="Watch Hours"
            sub="YouTube (last 6 months)"
          />
          <StatCard
            value="290K"
            label="Peak Month Views"
            sub="October 2025"
          />
          <StatCard
            value="8x"
            label="Follower Growth"
            sub="Spotify: 669 → 5,371"
          />
          <StatCard
            value="22"
            label="Long-Form Episodes"
            sub="+ 198 short-form clips"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
              Monthly YouTube Views
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

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                Spotify Stream Trajectory
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-neutral-600">
                {MONTHLY_STREAMS.map((m, i) => (
                  <span key={m.month} className="flex items-center gap-1.5">
                    <span className="tabular-nums">{fmt(m.streams)}</span>
                    {i < MONTHLY_STREAMS.length - 1 && (
                      <span className="text-neutral-300">&rarr;</span>
                    )}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-neutral-900 text-white">
                  472% growth
                </span>
                <span className="text-xs text-neutral-400">
                  Aug &apos;25 &rarr; Jan &apos;26
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
              <p className="text-4xl font-bold">8x</p>
              <p className="text-sm text-neutral-500 mt-1">
                Spotify follower growth
              </p>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-neutral-400">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-900" />
                669 &rarr; 5,371 followers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-neutral-200" />
      </div>

      {/* ── CORE AUDIENCE ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader
          title="Core Audience"
          subtitle="Who watches and listens to Open Residency"
        />

        <p className="text-lg text-neutral-500 leading-relaxed max-w-3xl mb-10">
          Our audience is overwhelmingly male (83%), ages 23&ndash;44 (86%),
          and concentrated in English-speaking markets. They are founders,
          operators, brand builders, and aspiring entrepreneurs&nbsp;&mdash; the
          exact demographic that premium DTC, SaaS, and lifestyle brands want
          to reach.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { v: "86%", l: "Ages 23–44", s: "Core buying demographic" },
            { v: "83%", l: "Male", s: "Primary audience" },
            { v: "65%", l: "English-Speaking", s: "US, UK, AU, CA combined" },
          ].map((stat) => (
            <div
              key={stat.l}
              className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/60 text-center"
            >
              <p className="text-4xl font-bold tracking-tight text-neutral-900">
                {stat.v}
              </p>
              <p className="text-sm font-medium text-neutral-600 mt-1">
                {stat.l}
              </p>
              <p className="text-xs text-neutral-400 mt-1">{stat.s}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* ── GUEST ROSTER ──────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader
          title="Guest Roster"
          subtitle="Founders, operators, and creators who have been on the show"
        />

        <p className="text-sm text-neutral-500 mb-4">
          {PUBLISHED_GUESTS.length} published episodes
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
          {PUBLISHED_GUESTS.map((g) => (
            <GuestCard
              key={g.name}
              name={g.name}
              company={g.company}
              note={g.note}
            />
          ))}
        </div>

        <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
        <p className="text-sm text-neutral-500 mb-4">
          {UPCOMING_GUESTS.length}+ confirmed guests in pipeline
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {UPCOMING_GUESTS.map((g) => (
            <GuestCard
              key={g.name}
              name={g.name}
              company={g.company || undefined}
              note={g.note || undefined}
              filmed={g.filmed}
              upcoming
            />
          ))}
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
            Last updated February 2026
          </p>
        </div>
      </footer>
    </main>
  );
}
