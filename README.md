# Skyluxxe Concierge Travel

Marketing site for Skyluxxe Concierge Travel (skyluxxe.ae). Next.js App Router,
React 19, Tailwind CSS 4, deployed on Vercel.

## Develop

```bash
npm install
cp .env.example .env.local   # then fill in what you need
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Environment variables

All variables are documented in [`.env.example`](.env.example). The ones that
matter for a working production site:

- **Enquiry delivery** — `RESEND_API_KEY` (with `ENQUIRY_FROM_EMAIL` on a
  verified domain) and/or `ENQUIRY_WEBHOOK_URL`. Without either, the enquiry
  form cannot deliver and tells visitors to email instead.
- **Spam protection** — `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and
  `TURNSTILE_SECRET_KEY`, set together.

## Where things live

- `app/` — routes. Each page sets its canonical URL and share metadata through
  `lib/page-metadata.ts`.
- `content/` — copy and data: services, brand details, legal text, image map.
- `components/sections/` — page sections; `components/ui/` — shared UI.
- `app/api/enquiry/route.ts` — enquiry form endpoint (validation, Turnstile,
  rate limit, delivery).
- `next.config.ts` — security headers and image settings.

## Notes

- `/journal` is a placeholder: it is `noindex` and left out of the sitemap
  until there are articles.
- The hero video has two encodes in `public/`: the full one for desktop and a
  540p one for narrow screens. Replace both when the footage changes, along
  with `public/images/brand/hero-poster.webp` (its first frame).
