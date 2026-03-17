"use client";

import Image from "next/image";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ── data ─────────────────────────────────────────────────────────── */

const GROWTH_DATA = [
  { month: "Aug '25", backCatalog: 21400, newEpisodes: 85600 },
  { month: "Sep '25", backCatalog: 52500, newEpisodes: 122500 },
  { month: "Oct '25", backCatalog: 169050, newEpisodes: 313950 },
  { month: "Nov '25", backCatalog: 297600, newEpisodes: 446400 },
  { month: "Dec '25", backCatalog: 457000, newEpisodes: 495000 },
  { month: "Jan '26", backCatalog: 703380, newEpisodes: 530620 },
];

const CHART_BLACK = "#1a1a1a";
const CHART_GRAY = "#888";

/* ── helpers ──────────────────────────────────────────────────────── */

function StatCard({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
      <p className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">{value}</p>
      <p className="text-sm font-semibold text-neutral-600 mt-1">{label}</p>
      <p className="text-xs text-neutral-400 mt-0.5">{sub}</p>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function FeatureItem({ text, note }: { text: string; note?: string }) {
  return (
    <div className="flex gap-2.5 py-2 border-b border-neutral-100 last:border-0">
      <CheckIcon />
      <div>
        <p className="text-sm text-neutral-900 font-medium leading-snug">{text}</p>
        {note && <p className="text-xs text-neutral-400 mt-0.5">{note}</p>}
      </div>
    </div>
  );
}

/* ── page ─────────────────────────────────────────────────────────── */

export default function CadencePage() {
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
            Partnership Proposal&ensp;/&ensp;March 2026
          </span>
        </div>
      </nav>

      {/* ── BANNER ───────────────────────────────────────────────────── */}
      <div className="w-full">
        <Image
          src="/cadence-header.jpg"
          alt="Cadence × Open Residency"
          width={1920}
          height={720}
          className="w-full h-48 md:h-72 lg:h-[28rem] xl:h-[32rem] object-cover"
          priority
        />
      </div>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-14 md:pt-20 pb-12">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400">
              Equity Partnership
            </p>
            <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-neutral-900 text-white">
              Open Residency × Cadence
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
            A founder-led media
            <br />
            partnership built for
            <br />
            compounding value
          </h1>
          <p className="text-lg text-neutral-500 leading-relaxed max-w-2xl">
            1.8M+ views in 6 months, and we&rsquo;re just getting started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            value="1.8M+"
            label="Cross-Platform Views"
            sub="Long-form only · Last 6 months"
          />
          <StatCard
            value="164%"
            label="MoM View Growth"
            sub="Aug '25 → Jan '26"
          />
          <StatCard
            value="24"
            label="Published Episodes"
            sub="30+ more guests booked"
          />
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-neutral-200" />
      </div>

      {/* ── PERMANENT REAL ESTATE ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader
          title="Permanent Real Estate, Not Rented Impressions"
          subtitle="Why this is fundamentally different from traditional sponsorship"
        />

        {/* comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-neutral-100 rounded-2xl border border-neutral-200/60 p-6">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-400 mb-4">
              Traditional Sponsorship
            </p>
            <div className="space-y-3">
              {[
                "Pre-roll ad — skippable, forgettable",
                "Campaign flight ends, impressions stop",
                "Dynamic ads get swapped out over time",
                "Value measured in first-week performance",
              ].map((line) => (
                <p key={line} className="text-sm text-neutral-400 leading-relaxed">{line}</p>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-900 mb-4">
              Open Residency
            </p>
            <div className="space-y-3">
              {[
                "On-screen logo burned into every frame — permanent",
                "Episodes rank in YouTube & Google search for years",
                "Back-catalog views grow month over month",
                "Value compounds with every future view",
              ].map((line) => (
                <p key={line} className="text-sm text-neutral-900 font-medium leading-relaxed">{line}</p>
              ))}
            </div>
          </div>
        </div>

        {/* concept cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <p className="font-bold text-neutral-900 mb-2">On-Screen Burn-In</p>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Your logo is composited into the episode permanently. It&rsquo;s not a skippable pre-roll&nbsp;&mdash;
              it&rsquo;s owned digital real estate that lives in every frame, for every viewer, forever.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <p className="font-bold text-neutral-900 mb-2">Search Compounding</p>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Top podcast episodes function like Wikipedia articles&nbsp;&mdash; they surface in search for years.
              Sponsors baked into them keep generating returns long after the initial drop.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <p className="font-bold text-neutral-900 mb-2">Evergreen Library</p>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Every new subscriber rediscovers your brand across 24+ episodes.
              The library is the asset&nbsp;&mdash; and it only gets bigger.
            </p>
          </div>
        </div>

        {/* growth chart */}
        <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                Cumulative Cross-Platform Views
              </h3>
              <p className="text-xs text-neutral-400">YouTube + Spotify (Aug &apos;25 – Jan &apos;26)</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#1a1a1a]" />
                <span className="text-xs text-neutral-500">Back Catalog</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#c4c4c4]" />
                <span className="text-xs text-neutral-500">New Episodes</span>
              </div>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={GROWTH_DATA} stackOffset="none">
                <defs>
                  <linearGradient id="backCatalogGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_BLACK} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={CHART_BLACK} stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="newEpisodesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_GRAY} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={CHART_GRAY} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: CHART_GRAY, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: CHART_GRAY, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : `${(v / 1000).toFixed(0)}K`} />
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Tooltip
                  content={({ active, payload, label }: any) => {
                    if (active && payload && payload.length) {
                      const bc = payload.find((p: any) => p.dataKey === "backCatalog")?.value ?? 0;
                      const ne = payload.find((p: any) => p.dataKey === "newEpisodes")?.value ?? 0;
                      const total = bc + ne;
                      const pct = total > 0 ? Math.round((bc / total) * 100) : 0;
                      const fmt = (v: number) => v >= 1000000 ? `${(v / 1000000).toFixed(2)}M` : `${(v / 1000).toFixed(0)}K`;
                      return (
                        <div className="bg-white border border-neutral-200 rounded-lg px-3 py-2 shadow-lg text-sm">
                          <p className="text-neutral-500 text-xs mb-1">{label}</p>
                          <p className="font-semibold text-neutral-900">{fmt(total)} total views</p>
                          <p className="text-neutral-600 text-xs mt-1">Back catalog: {fmt(bc)} ({pct}%)</p>
                          <p className="text-neutral-400 text-xs">New episodes: {fmt(ne)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="backCatalog" stackId="1" stroke={CHART_BLACK} strokeWidth={2} fill="url(#backCatalogGrad)" />
                <Area type="monotone" dataKey="newEpisodes" stackId="1" stroke={CHART_GRAY} strokeWidth={1} fill="url(#newEpisodesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <p className="text-2xl font-bold tracking-tight text-neutral-900">57%</p>
              <p className="text-sm text-neutral-500">of Jan &apos;26 views from episodes older than 30 days</p>
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold tracking-tight text-neutral-900">213K</p>
              <p className="text-sm text-neutral-500">monthly back-catalog views</p>
              <p className="text-xs text-neutral-400 mt-0.5">Robert Greene episode alone drove 60K views (Feb 8 – Mar 8)</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-neutral-200" />
      </div>

      {/* ── PARTNERSHIP SCOPE ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader title="Partnership Scope" subtitle="What Cadence gets" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Content Integration */}
          <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-400 mb-3">
              Content Integration
            </p>
            <FeatureItem text="30 Ad Reads" note="Long-form, organic embeds across episodes" />
            <FeatureItem text="On-Screen Logo Burn-In" note="Premium format — 3 slots bottom-right, 30+ episodes min. Unsold inventory deferred to equity partners." />
            <FeatureItem text="On-Table Product Placement" note="Physical product on set, as many episodes as possible" />
            <FeatureItem text="Guest Integration" note="Ask favorite flavor beforehand, gift day-of, content + warm intros where it makes sense" />
          </div>

          {/* Social & Distribution */}
          <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-400 mb-3">
              Social &amp; Distribution
            </p>
            <FeatureItem text="Hard Posts & Carousel Integrations" note="Organic, across all platforms" />
            <FeatureItem text="Stories" note="Organic, authentic usage" />
            <FeatureItem text="Website Logo Integration" />
            <FeatureItem text="Metadata Integration" note="All platforms" />
            <FeatureItem text="Affiliate" note="Standard terms" />
          </div>

          {/* Network & Access */}
          <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-400 mb-3">
              Network &amp; Access
            </p>
            <FeatureItem text="Warm Intros" note="Curated, strategic — Mark's network is yours" />
            <FeatureItem text="Gifting" note="Curated list of high-value recipients" />
            <FeatureItem text="HoldCo First Look" note="Early access to ventures on Mark's side" />
            <FeatureItem text="Direct Ecomm Access for Matty" note="Mark's ecomm plugs, direct line" />
          </div>

          {/* Perks */}
          <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-400 mb-3">
              Perks
            </p>
            <FeatureItem text="Product at Wholesale" note="50% off your low price during term" />
          </div>
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-neutral-200" />
      </div>

      {/* ── EQUITY OPPORTUNITY ───────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-neutral-900 text-white rounded-2xl p-8 md:p-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-6">
            Equity Partnership
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <p className="text-3xl md:text-4xl font-bold tracking-tight">100K</p>
              <p className="text-sm text-neutral-400 mt-1">Shares</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold tracking-tight">$300K</p>
              <p className="text-sm text-neutral-400 mt-1">Current Value</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold tracking-tight">$120M</p>
              <p className="text-sm text-neutral-400 mt-1">Company Valuation</p>
            </div>
          </div>

          <p className="text-neutral-300 leading-relaxed max-w-3xl">
            100K shares at current valuation represents $300K&nbsp;&mdash; offered as equity alignment,
            not compensation. Every metric is growing month over month. The next tranche of growth
            takes this nuclear. Priced at today&rsquo;s valuation&nbsp;&mdash; the upside scales with the show.
          </p>
        </div>
      </section>

      {/* ── CTA + FOOTER ─────────────────────────────────────────────── */}
      <footer className="border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Let&rsquo;s Build This Together
          </h2>
          <a
            href="mailto:info@openresidency.com?subject=Cadence%20×%20Open%20Residency"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Get In Touch
          </a>
          <p className="text-sm text-neutral-400 mt-6">
            Mark Brazil&ensp;/&ensp;info@openresidency.com
          </p>
        </div>
      </footer>
    </main>
  );
}
