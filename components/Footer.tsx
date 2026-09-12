export default function Footer() {
    return (
        <footer className="mt-12 border-t border-[#800000]/15 bg-[#e9e1d5]/50 py-10">
            <div className="mx-auto px-5 text-center text-sm text-[#746963] sm:px-8">
                <p>&copy; {new Date().getFullYear()} Colne Valley Ward Sacrament Meeting Planner.</p>
                <p className="mt-2">Built for WDD 430 - Web Full-Stack Development.</p>
            </div>
        </footer>
    );
}
