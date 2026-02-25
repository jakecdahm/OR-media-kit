"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
const PUBLISHED_GUESTS = [
  { name: "Robert Greene", company: "Author", note: "48 Laws of Power", url: "https://www.youtube.com/watch?v=-1aSoZ1ffTg" },
  { name: "Dee Murthy", company: "GHST", note: "9 figures", url: "https://www.youtube.com/@openresidency" },
  { name: "Bill Shufelt", company: "Athletic Brewing", note: "9 figures", url: "https://www.youtube.com/watch?v=tA9Auu8glpE" },
  { name: "Nate Checketts", company: "Rhone", note: "9 figures", url: "https://www.youtube.com/watch?v=FoTVLPQna2Y" },
  { name: "Ryan Bartlett", company: "True Classic", note: "9 figures", url: "https://www.youtube.com/watch?v=l6BpG8ff3Qc" },
  { name: "Bryan Garafalow", company: "Skullcandy", note: "9 figures", url: "https://www.youtube.com/watch?v=yhNcUzoHB_4" },
  { name: "Sean Frank", company: "Ridge", note: "9 figures", url: "https://www.youtube.com/watch?v=2eGds8kLszE" },
  { name: "George Heaton", company: "Represent", note: "9 figures", url: "https://www.youtube.com/watch?v=6tTLUuD06AY" },
  { name: "Kent Yoshimura", company: "NeuroGum", note: "9 figures", url: "https://www.youtube.com/watch?v=ccGFIAfyNyg" },
  { name: "Joel Kocher", company: "Humann", note: "9 figures", url: "https://www.youtube.com/watch?v=UtsHkR7TFvo" },
  { name: "Oliver Zak", company: "Mad Rabbit", note: "8 figures", url: "https://www.youtube.com/watch?v=mbsjQncrqzw" },
  { name: "Manny Lubin", company: "Slate Milk", note: "8 figures", url: "https://www.youtube.com/watch?v=MzX-PxocoPw" },
  { name: "Nick Shackelford", company: "Brez / Structured", note: "8 figures", url: "https://www.youtube.com/watch?v=mdqvLXm48aE" },
  { name: "Simon Molnar", company: "Flagship.ai", note: "8 figures", url: "https://www.youtube.com/@openresidency" },
  { name: "Sahil Bloom", company: "Creator", note: "NYT Best Seller", url: "https://www.youtube.com/watch?v=9yjGTflQDbg" },
  { name: "Mark Manson", company: "Author", note: "NYT Best Seller", url: "https://www.youtube.com/watch?v=sgpmGr1e3iI" },
  { name: "Dan Koe", company: "Creator", note: "Culture", url: "https://www.youtube.com/watch?v=EVDQ1MijHbk" },
  { name: "Samir", company: "Colin and Samir", note: "Culture", url: "https://www.youtube.com/watch?v=Yl_HLGoWWJE" },
  { name: "Kane Kallaway", company: "Creator", note: "Culture", url: "https://www.youtube.com/watch?v=VcqQmrGqthg" },
  { name: "Caleb Ralston", company: "Creator", note: "Culture", url: "https://www.youtube.com/watch?v=g8i0FYcJEAE" },
  { name: "Oren John", company: "Creator", note: "Culture", url: "https://www.youtube.com/watch?v=uI5Qo58FqiE" },
  { name: "RPN", company: "Creator", note: "Culture", url: "https://www.youtube.com/watch?v=b-fTeo4a9N8" },
  { name: "Jeff Byers", company: "Momentous", note: "9 figures", url: "https://www.youtube.com/@openresidency" },
];

const UPCOMING_GUESTS = [
  { name: "Taylor Holiday", company: "CommonThread Collective", note: "8 figures", filmed: true },
  { name: "Daniel Arsham", company: "Creator", note: "Culture", filmed: false },
  { name: "Paddy Gallaway", company: "Creator", note: "Culture", filmed: false },
  { name: "Simon Squibb", company: "Creator", note: "Culture", filmed: false },
  { name: "Codie Sanchez", company: "Contrarian Thinking", note: "8 figures", filmed: false },
  { name: "Dom Iacavone", company: "RAW (and more)", note: "9 figures", filmed: false },
  { name: "Rob Dyrdek", company: "Dyrdek Machine/Existence", note: "", filmed: false },
  { name: "Marc Ecko", company: "Ecko (and more)", note: "", filmed: false },
  { name: "OMG Adrian", company: "Creator", note: "Culture", filmed: false },
  { name: "Meghan Lightcap", company: "Slow Ventures", note: "Fund", filmed: true },
  { name: "Dan Martell", company: "SaaS Academy", note: "8 figures", filmed: false },
  { name: "Matt Gray", company: "Founder OS", note: "8 figures", filmed: false },
  { name: "Josh/Bill", company: "Baseball Lifestyle", note: "9 figures", filmed: false },
  { name: "Alex Sobol", company: "Millennium", note: "9 figures", filmed: false },
  { name: "Chris Voss", company: "Author", note: "NYT Best Seller", filmed: false },
  { name: "Bart Szaniewski", company: "Dad Gang", note: "8 figures", filmed: false },
  { name: "Bruno Casanovas", company: "Nude", note: "8 figures", filmed: false },
  { name: "Danny Yeung", company: "IM8", note: "9 figures", filmed: true },
  { name: "Sean Riley", company: "Dude Wipes", note: "9 figures", filmed: false },
  { name: "Dave Grutman", company: "Miami", note: "Culture", filmed: false },
  { name: "Nick Green", company: "Thrive Market", note: "10 figures", filmed: false },
  { name: "Georgios Frangulis", company: "Oakberry", note: "9 figures", filmed: false },
  { name: "Hudson Leogrande", company: "COMFRT", note: "9 figures", filmed: false },
  { name: "Greg Lavecchia", company: "Bloom Nutrition", note: "9 figures", filmed: false },
  { name: "Tyler Denk", company: "Beehiv", note: "9 figures", filmed: false },
  { name: "Nima Jalali", company: "Salt & Stone", note: "9 figures", filmed: false },
  { name: "Michael Brandt", company: "Ketone", note: "8 figures", filmed: false },
  { name: "Adam/Ryan Goldston", company: "APL", note: "8 figures", filmed: false },
  { name: "Rourke Heath", company: "Creator", note: "Culture", filmed: false },
  { name: "Ilya Pozin", company: "TELLY", note: "9 figures", filmed: false },
];

/* ==========================================================================
   SHARED COMPONENTS
   ========================================================================== */

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
  url,
}: {
  name: string;
  company?: string;
  note?: string;
  filmed?: boolean;
  upcoming?: boolean;
  url?: string;
}) {
  const content = (
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
  );

  const className = `bg-white rounded-xl shadow-sm p-4 block ${
    upcoming
      ? "border border-dashed border-neutral-300"
      : "border border-neutral-200/60"
  } ${url ? "hover:bg-neutral-50 transition-colors" : ""}`;

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

function SizzleReel() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-0">
      <div className="rounded-2xl overflow-hidden border border-neutral-200/60 shadow-sm">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src="https://player.vimeo.com/video/1165442164?h=03653a5f79&title=0&byline=0&portrait=0"
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

const PHOTOS = [
  { n: "5V2A5389", a: 0.667 }, { n: "L1006452", a: 0.664 },
  { n: "5V2A3284", a: 0.667 }, { n: "L1005057", a: 0.664 },
  { n: "5V2A0425", a: 0.667 }, { n: "L1006194", a: 0.664 },
  { n: "5V2A3332", a: 0.667 }, { n: "L1005698", a: 0.664 },
  { n: "5V2A4677", a: 0.667 }, { n: "L1006421", a: 0.664 },
  { n: "5V2A0518", a: 0.667 }, { n: "L1005006", a: 0.664 },
  { n: "5V2A3450", a: 0.667 }, { n: "L1006147", a: 0.664 },
  { n: "5V2A5426", a: 0.667 }, { n: "L1005623", a: 0.664 },
  { n: "5V2A9274", a: 0.667 }, { n: "L1006382", a: 0.664 },
  { n: "5V2A3392", a: 0.667 }, { n: "L1005814", a: 0.664 },
  { n: "5V2A0462", a: 0.667 }, { n: "L1003913", a: 0.664 },
  { n: "5V2A5591", a: 0.667 }, { n: "L1006742", a: 0.667 },
  { n: "5V2A3444", a: 0.667 }, { n: "L1005855", a: 1.504 },
  { n: "5V2A4785", a: 0.667 }, { n: "L1006463", a: 0.664 },
  { n: "5V2A5467", a: 0.667 }, { n: "L1005919", a: 0.664 },
];

/* ==========================================================================
   PAGE
   ========================================================================== */

export default function MediaKit() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const touchStartX = useRef(0);

  const closeLightbox = useCallback(() => {
    setLightboxIdx(null);
    document.body.style.overflow = "";
  }, []);

  const prev = useCallback(() => {
    setLightboxIdx((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  const next = useCallback(() => {
    setLightboxIdx((i) =>
      i !== null && i < PHOTOS.length - 1 ? i + 1 : i
    );
  }, []);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIdx(idx);
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, closeLightbox, prev, next]);

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
          className="w-full h-48 md:h-72 lg:h-[28rem] xl:h-[32rem] object-cover"
          priority
        />
      </div>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-14 md:pt-20 pb-12">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400">
              Partnership Deck
            </p>
            <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-neutral-900 text-white">
              Last 6 Months
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
            The long-form podcast for
            <br />
            business operators
            <br />
            &amp;&nbsp;brand builders
          </h1>
          <p className="text-lg text-neutral-500 leading-relaxed">
            1.8M+ views in 6 months, and we&apos;re just getting started.
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
            sub="Long-Form Only · YouTube + All Podcast Platforms"
          />
          <StatCard
            value="15.2M"
            label="YouTube Impressions"
            sub="Thumbnail impressions served"
          />
          <StatCard
            value="164%"
            label="View Growth"
            sub="Monthly views Aug '25 → Jan '26"
          />
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-neutral-200" />
      </div>

      {/* ── SIZZLE REEL ──────────────────────────────────────────── */}
      <SizzleReel />

      {/* ── ABOUT THE SHOW ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader title="About The Show" />

        <div className="space-y-5">
          <p className="text-neutral-600 leading-relaxed">
            Hosted by{" "}
            <span className="font-semibold text-neutral-900">Mark Brazil</span>
            &nbsp;&mdash; Operator, Creator &amp; Investor.
            CEO of IKONICK (8-figure brand backed by GaryVee; 50+ licenses
            including Michael Jordan, Muhammad Ali, Tiger Woods), former CMO at Melin (scaled to 9 figures).
            Produced by the same creative team behind projects for Leo Messi, Adidas, Nike, and MLB.
          </p>
          <p className="text-neutral-900 font-semibold leading-relaxed">
            The mission: bring the stories, tactics, and principles of
            what is working right now&nbsp;&mdash; straight from the founders
            and operators doing it.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            A partnership with Open Residency is not just media
            placement&nbsp;&mdash; it&apos;s a relationship with Mark and
            his network as a business development and sales machine.
          </p>
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-neutral-200" />
      </div>

      {/* ── AUDIENCE PROFILE ──────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader
          title="Who Listens"
          subtitle="Last 6 months (Aug '25 – Jan '26)"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              segment: "Aspiring Founders",
              desc: "Learning from those who\u2019ve done it before they take the leap. They come for the playbooks, tactics, and real talk on what it actually takes.",
            },
            {
              segment: "Active Operators",
              desc: "Scaling a brand or company right now. They\u2019re looking for the strategies and principles that are working today \u2014 not theory from ten years ago.",
            },
            {
              segment: "Investors & Advisors",
              desc: "Staying connected to what\u2019s next. They use the show to spot trends, discover founders, and stay sharp on the operator mindset.",
            },
          ].map((s) => (
            <div
              key={s.segment}
              className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6"
            >
              <p className="font-bold text-neutral-900 mb-2">{s.segment}</p>
              <p className="text-sm text-neutral-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard value="86%" label="Ages 23–44" sub="Core buying demographic" />
          <StatCard value="83%" label="Male" sub="Primary audience" />
        </div>
        <p className="text-sm text-neutral-600 mb-8">
          <span className="font-semibold text-neutral-900">Starting Q1 2026</span> — releasing episodes at 2X frequency.
        </p>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-neutral-200" />
      </div>

      {/* ── LONG-FORM CONTENT ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader
          title="Long-Form Content"
          subtitle="YouTube, Spotify, Apple Podcasts"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard value="1.8M+" label="Cross-Platform Views" sub="YouTube + All Podcast Platforms" />
          <StatCard value="255K+" label="Watch Hours" sub="Long-form only" />
          <StatCard value="15.2M" label="YouTube Impressions" sub="Thumbnail impressions served" />
          <StatCard value="220+" label="Pieces of Content" sub="22 long-form episodes + 198 clips" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: "-1aSoZ1ffTg", guest: "Robert Greene", note: "Author, 48 Laws of Power" },
            { id: "EVDQ1MijHbk", guest: "Dan Koe", note: "Creator" },
            { id: "Yl_HLGoWWJE", guest: "Samir", note: "Colin and Samir" },
            { id: "6tTLUuD06AY", guest: "George Heaton", note: "Represent, 9 figures" },
            { id: "ccGFIAfyNyg", guest: "Kent Yoshimura", note: "NeuroGum, 9 figures" },
            { id: "2eGds8kLszE", guest: "Sean Frank", note: "Ridge, 9 figures" },
          ].map((ep) => (
            <a
              key={ep.id}
              href={`https://www.youtube.com/watch?v=${ep.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl overflow-hidden border border-neutral-200/60 shadow-sm bg-white hover:shadow-md transition-shadow block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${ep.id}/maxresdefault.jpg`}
                alt={ep.guest}
                className="w-full aspect-video object-cover"
              />
              <div className="p-4">
                <p className="font-semibold text-sm text-neutral-900">{ep.guest}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{ep.note}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="rounded-2xl overflow-hidden border border-neutral-200/60 shadow-sm bg-white">
            <iframe
              src="https://open.spotify.com/embed/show/5SPMRnD4iKSHKcTl4mMqbM?theme=0"
              className="w-full border-0"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
          <div className="rounded-2xl overflow-hidden border border-neutral-200/60 shadow-sm bg-white">
            <iframe
              src="https://embed.podcasts.apple.com/us/podcast/open-residency/id1791782856?theme=light"
              className="w-full border-0"
              height="352"
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              loading="lazy"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
            />
          </div>
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-neutral-200" />
      </div>

      {/* ── SHORT-FORM ──────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader
          title="Short-Form Content"
          subtitle="Instagram Reels — @openresidency + @markbrazil"
        />

        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard value="100K+" label="Combined Followers" sub="@openresidency + @markbrazil" />
          <StatCard value="2M+" label="Monthly Impressions" sub="Combined across accounts" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            "DRkNaS3DldC",
            "DR4zLzjDul-",
            "DTssfhdDfsQ",
            "DULkgNMDX4W",
            "DQ2TIBxknrn",
            "DP_yUcvjXie",
          ].map((id) => (
            <div key={id} className="rounded-2xl overflow-hidden border border-neutral-200/60 shadow-sm bg-white">
              <iframe
                src={`https://www.instagram.com/reel/${id}/embed/`}
                className="w-full border-0 overflow-hidden"
                height="680"
                allow="encrypted-media"
              />
            </div>
          ))}
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
              url={g.url}
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
            {[
              { name: "COMCAST", category: "CTV" },
              { name: "BEEHIIV", category: "Email" },
              { name: "MANYCHAT", category: "Messaging" },
              { name: "POPPY.AI", category: "AI" },
              { name: "K&L GATES", category: "Legal" },
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

      </section>

      {/* ── PHOTO GRID ──────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader title="BTS" />
        <div className="gallery-grid">
          {PHOTOS.map(({ n, a }, i) => (
            <div
              key={n}
              className="gallery-item cursor-pointer"
              style={{ "--aspect": a } as React.CSSProperties}
              onClick={() => openLightbox(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/photos/${n}.webp`}
                alt="Open Residency"
                loading={i < 8 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── LIGHTBOX ───────────────────────────────────────────────── */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95"
          onClick={closeLightbox}
          onTouchStart={(e) => { touchStartX.current = e.changedTouches[0].screenX; }}
          onTouchEnd={(e) => {
            const diff = touchStartX.current - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
          }}
        >
          <button
            className="absolute top-4 right-5 text-white/60 hover:text-white text-3xl z-10"
            onClick={closeLightbox}
            aria-label="Close"
          >
            &times;
          </button>
          {lightboxIdx > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-2xl z-10 p-2"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              &#8592;
            </button>
          )}
          {lightboxIdx < PHOTOS.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-2xl z-10 p-2"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              &#8594;
            </button>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/photos/${PHOTOS[lightboxIdx].n}.webp`}
            alt="Open Residency"
            className="max-w-[95vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

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
          <div className="flex items-center gap-4">
            <a
              href="mailto:mark@openresidency.com"
              className="text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              mark@openresidency.com
            </a>
            <p className="text-xs text-neutral-400">
              Updated Feb 2026
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
