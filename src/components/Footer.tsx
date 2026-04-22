import { profile } from '../data/profile'

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-muted sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>
          © 2026 {profile.name}. Built with React, TypeScript, Vite and Tailwind
          CSS.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="transition hover:text-foreground"
          >
            {profile.email}
          </a>
          <a
            href={profile.socialLinks[1]?.href}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
