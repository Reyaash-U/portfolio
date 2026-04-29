export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        bg2: 'var(--bg2)',
        bg3: 'var(--bg3)',
        amber: 'var(--amber)',
        'amber-dim': 'var(--amber-dim)',
        'amber-glow': 'var(--amber-glow)',
        white: 'var(--white)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        'nav-glass': 'var(--nav-glass)',
      },
      fontFamily: {
        head: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: 'var(--card-shadow)',
      }
    },
  },
  plugins: [],
}
