export default function MeetingsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 md:py-16">
            {children}
        </div>
    );
}
