import { useState } from 'react'

const navItems = [
  { label: '首页', href: '#home' },
  { label: '关于我', href: '#about' },
  { label: '作品', href: '#projects' },
  { label: '联系', href: '#contact' },
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex flex-col">
          <span className="text-sm uppercase tracking-[0.4em] text-accent">
            Baihua
          </span>
          <span className="text-base font-semibold text-foreground">
            个人作品集
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="主导航">
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
            className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-foreground transition hover:border-accent hover:bg-accent/15"
          >
            发起联系
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex items-center rounded-full border border-line px-4 py-2 text-sm text-foreground md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          菜单
        </button>
      </div>

      {isMenuOpen ? (
        <nav
          id="mobile-navigation"
          className="border-t border-line bg-black/90 px-4 py-4 md:hidden"
          aria-label="移动端主导航"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-transparent px-3 py-2 text-sm text-muted transition hover:border-line hover:bg-white/5 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  )
}

export default Header
