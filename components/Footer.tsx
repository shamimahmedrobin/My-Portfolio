export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-black/10 dark:border-white/10 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <p className="text-sm font-medium text-black/60 dark:text-white/60">
          © {currentYear} Shamim Ahmed Robin. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
