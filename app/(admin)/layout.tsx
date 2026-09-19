export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 md:py-16">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#800000]">Leader workspace</p>
            {children}
        </div>
    );
}
