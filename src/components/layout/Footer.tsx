export default function Footer() {
  return (
    <footer className="bg-[var(--color-berkeley-blue)] text-white/80 py-8 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">
            <p className="font-semibold text-white">UC Berkeley</p>
            <p>Office of the CIO / People & Culture</p>
          </div>
          <div className="text-sm text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} UC Regents. All rights reserved.</p>
            <p className="text-xs mt-1 text-white/60">
              This is a demonstration MVP. Not for production use.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
