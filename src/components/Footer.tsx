import { profile } from '../data/profile'

function Footer() {
  return (
    <footer className="border-t border-line/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-muted sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>
          © 2026 {profile.name}.{' '}
          {
            '\u57fa\u4e8e React\u3001TypeScript\u3001Vite \u4e0e Tailwind CSS \u6784\u5efa\u3002'
          }
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
