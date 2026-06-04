import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { siteContent } from '../data/content'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { header } = siteContent

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-[rgba(6,7,8,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-baseline gap-3">
          <span className="font-display text-xl text-foreground">{header.brandName}</span>
          <span className="text-[10px] uppercase tracking-[0.42em] text-muted">
            {header.brandSubline}
          </span>
        </a>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label={header.navAriaLabel}
        >
          {header.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-sm text-muted transition hover:text-foreground after:absolute after:-bottom-3 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-[width] hover:after:w-full"
            >
              {item.label}
            </a>
          ))}

          <span className="h-5 w-px bg-line/80" aria-hidden="true" />

          <a
            href="#contact"
            className="rounded-full border border-line bg-[rgba(255,255,255,0.035)] px-5 py-2 text-sm font-medium text-foreground transition hover:border-accent hover:bg-[rgba(102,217,255,0.1)] hover:text-accent"
          >
            {header.contactCta}
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-foreground md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span>
            {isMenuOpen ? header.closeMenuLabel : header.openMenuLabel}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.nav
            id="mobile-navigation"
            className="border-t border-line/70 bg-[rgba(6,7,8,0.96)] px-4 py-4 md:hidden"
            aria-label={header.mobileNavAriaLabel}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="mx-auto flex max-w-[1400px] flex-col gap-2">
              {header.navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-3 py-3 text-sm text-muted transition hover:bg-[rgba(255,255,255,0.05)] hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              <a
                href="#contact"
                className="mt-2 rounded-2xl border border-line bg-[rgba(255,255,255,0.035)] px-3 py-3 text-sm text-foreground transition hover:border-accent hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                {header.contactCta}
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Header
