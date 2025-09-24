export default function Footer() {
  return (
    <footer className="bg-darkest text-text-on-dark py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm">
              <strong>Andrew Persad</strong> — Lead Frontend Engineer
              (React/Next.js)
            </p>
            <p className="text-xs text-text-muted-on-dark mt-1">
              I build scalable, accessible front-ends and design systems.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/akpersad"
              className="text-sm hover:text-medium-green transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/andrew-persad-aa496432/"
              className="text-sm hover:text-medium-green transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="border-t border-dark-green mt-6 pt-4 text-center">
          <p className="text-xs text-text-muted-on-dark">
            © 2025 Andrew Persad • Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
