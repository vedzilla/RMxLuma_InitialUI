import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-bold text-text">RM</span>
              <span className="w-2 h-2 rounded-full bg-red"></span>
            </div>
            <p className="text-sm text-muted">
              Discover society events across the UK
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-text mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted hover:text-text transition-colors">
                  Discover Events
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted hover:text-text transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-muted hover:text-text transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-text mb-4">Get Started</h3>
            <Link
              href="/about"
              className="inline-block px-4 py-2 text-sm font-medium text-text border border-border rounded-lg hover:bg-bg transition-colors"
            >
              Get the App
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted">
          <p>© 2024 Redefine Me. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}





