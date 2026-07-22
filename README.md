# The Billion Animal Study

**Gather the medical records of one billion animals — so animals live longer, healthier lives.**

Public site for [billionanimals.org](https://www.billionanimals.org).

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build
npm start
```

Optional waitlist webhook (server-side):

```bash
WAITLIST_WEBHOOK_URL=https://example.com/hooks/waitlist
```

## Stack

- React Router 8 (Remix successor)
- Vite + TypeScript + Tailwind CSS v4
- Deployable on Vercel / Node

## SEO & accessibility

- `robots.txt` + `sitemap.xml`
- Open Graph / Twitter cards + `/images/og.jpg`
- JSON-LD (`Organization` + `WebSite`)
- WCAG AA contrast tokens on cream and dark sections
- Semantic landmarks, labeled join form, diagram `aria-label`s

## Contact

hello@billionanimals.org

---

© The Billion Animal Study
