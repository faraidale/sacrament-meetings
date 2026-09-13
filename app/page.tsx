import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-shell">
      <Image
        src="/supper.webp"
        alt=""
        fill
        className="absolute inset-0 -z-10 object-cover opacity-[0.07]"
        aria-hidden="true"
      />
      <div className="home-content relative z-10">
        <div className="hero-copy">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#800000]"><span className="h-px w-8 bg-[#800000]" />Sunday worship, thoughtfully arranged</p>
          <h1 className="hero-title">Make room for what matters.</h1>
          <p className="hero-description">A calm, beautiful place to plan, review, and print every sacrament meeting agenda for Colne Valley Ward.</p>
          <div className="hero-actions">
            <Link href="/meetings" className="hero-cta">View ward meetings <span aria-hidden="true">→</span></Link>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#746963]">2026 planning edition</span>
          </div>
        </div>

        <div className="hero-media">
          <div className="absolute -inset-3 rounded-[2rem] border border-[#800000]/15" />
          <div className="hero-media-frame">
            <Image
              src="/sacrament.jpg"
              alt="Sacrament meeting table"
              width={800}
              height={500}
              priority
            />
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-xl bg-white px-5 py-4 shadow-xl shadow-[#5f0000]/10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#800000]">This Sunday</p>
            <p className="mt-1 font-serif text-lg font-bold text-[#2c2522]">Worship in unity</p>
          </div>
        </div>
      </div>
    </div>
  );
}
