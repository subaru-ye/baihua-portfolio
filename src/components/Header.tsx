import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const navItems = [
  { label: '\u9996\u9875', href: '#home' },
  { label: '\u5173\u4e8e\u6211', href: '#about' },
  { label: '\u4f5c\u54c1', href: '#projects' },
  { label: '\u8054\u7cfb', href: '#contact' },
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-baseline gap-3">
          <span className="font-display text-xl text-foreground">
            {'\u767d\u6866'}
          </span>
          <span className="text-[10px] uppercase tracking-[0.42em] text-muted">
            Baihua Portfolio
          </span>
        </a>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label={'\u4e3b\u5bfc\u822a'}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-line px-4 py-2 text-sm text-foreground transition hover:border-accent hover:text-accent"
          >
            {'\u53d1\u8d77\u8054\u7cfb'}
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
            {isMenuOpen ? '\u5173\u95ed' : '\u83dc\u5355'}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.nav
            id="mobile-navigation"
            className="border-t border-line/70 bg-ink/95 px-4 py-4 md:hidden"
            aria-label={'\u79fb\u52a8\u7aef\u4e3b\u5bfc\u822a'}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="mx-auto flex max-w-[1400px] flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-3 py-3 text-sm text-muted transition hover:bg-white/5 hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Header
