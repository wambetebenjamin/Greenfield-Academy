# Greenfield Academy

Official website for **Greenfield Academy**, a private primary and secondary school in Karen, Nairobi, Kenya. Built with the Next.js 14 App Router and TypeScript, styled with Tailwind CSS, and ready to deploy on Vercel.

The layout, section rhythm, icon font and photography come from the `grad-school-1.0.0.zip` template that was uploaded to this repository, rebuilt as React components and recoloured to the school palette.

---

## Design system

| Token | Value | Used for |
| --- | --- | --- |
| Forest Green | `#1A6B3C` | Primary brand, buttons, headers, stats bar |
| Sky Blue | `#0099CC` | Secondary accents, links, contact form |
| Bright Yellow | `#FFD700` | Call to action highlights, crest, dividers |
| White | `#FFFFFF` | Surfaces and cards |

Typography is **Nunito** for headings and **Open Sans** for body copy, both self hosted through `@fontsource` so no request ever leaves the domain. Icons use the Font Awesome 4 webfont that shipped inside the template zip (`public/assets/fonts`, loaded from `styles/fontawesome.css`).

Motion comes from AOS for scroll reveals, plus hand written CSS transitions for the hero Ken Burns zoom, card lifts, tab switches, counters and the WhatsApp pulse. Everything collapses gracefully under `prefers-reduced-motion`.

---

## Sections

1. Topbar with admissions banner, phone, email and location (marquee on mobile)
2. Sticky navbar with school crest, scroll spy, mobile drawer and an Apply Now button
3. Full screen hero slider, three slides, autoplay, keyboard arrows and swipe
4. Animated statistics strip: students, teachers, years, university entry rate
5. About: Principal welcome, mission, vision and four core values
6. Academics: tabs for Primary, Junior Secondary and Senior Secondary with curriculum, subjects, pathways and co-curricular lists
7. Departments: six cards with icon, head of department and description
8. Admissions: requirements, a five step timeline and the online application form
9. News and Events: three latest articles plus a calendar style events list
10. Gallery: Sports, Academics, Arts and Events tabs, masonry layout, lightbox, swipeable on touch
11. Staff directory: twelve teacher cards with role, subject and email action
12. Testimonials carousel with star ratings
13. Contact: form, Google Maps embed, address, phone, email and WhatsApp
14. Footer: quick links by category, newsletter signup, socials, motto and copyright

Plus a floating WhatsApp button with a gentle pulse and the tooltip "Enquire About Admissions", and a mobile sticky bar with Call, WhatsApp and Apply.

---

## API routes

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/admission` | POST | Validates and stores an application, emails the parent and the registrar, sends a WhatsApp notification |
| `/api/contact` | POST | General enquiries, acknowledgement email plus internal copy |
| `/api/news` | GET | News and events JSON feed, merges `data/news.json` with staff posts. Supports `?type=news|events` and `?limit=` |
| `/api/newsletter` | POST | Stores unique subscribers and sends a welcome email |
| `/api/posts` | GET, POST | Staff only, publishes news and events to the live site |
| `/api/submissions` | GET | Staff only, lists applications, enquiries and subscribers |
| `/api/auth/[...nextauth]` | GET, POST | NextAuth credentials provider |

Every integration degrades gracefully. With no SMTP, KV or WhatsApp credentials the routes still return `200`, log what they would have sent and write to a local `.data` folder, so the site is fully clickable before any secrets exist.

---

## Staff portal

- `/staff/login` signs in through NextAuth credentials
- `/staff/dashboard` is protected by middleware and server side session checks
- Staff can publish news articles and events, which appear in the News and Events section immediately (`revalidatePath('/')`)
- Dashboard tabs also list admission applications, contact enquiries and newsletter subscribers

Demo accounts (replace before going live with the `STAFF_USERS` variable):

```
principal@greenfieldacademy.co.ke  /  greenfield2025
staff@greenfieldacademy.co.ke      /  greenfield2025
```

---

## Local development

```bash
npm install
cp .env.example .env.local   # fill in what you have, everything is optional locally
npm run dev                  # http://localhost:3000
```

Useful scripts:

```bash
npm run build       # production build
npm run start       # run the production build
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
```

---

## Deploying to Vercel

1. Push this branch and import the repository at [vercel.com/new](https://vercel.com/new). The framework preset is detected automatically.
2. Create a KV (Upstash Redis) store from **Storage** and connect it to the project. That injects `KV_REST_API_URL` and `KV_REST_API_TOKEN`.
3. Add the remaining environment variables from `.env.example` under **Settings, Environment Variables**:
   - `NEXTAUTH_SECRET` (`openssl rand -base64 32`) and `NEXTAUTH_URL`
   - `STAFF_USERS` as a JSON array of staff accounts
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
   - `ADMISSIONS_EMAIL`, `CONTACT_EMAIL`
   - `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID` for Cloud API notifications
   - `NEXT_PUBLIC_SITE_URL` set to the live domain
4. Deploy. Point `greenfieldacademy.co.ke` at the project under **Settings, Domains**.

---

## SEO and PWA

- `School`, `Course` and `WebSite` JSON-LD in `components/JsonLd.tsx`
- Open Graph and Twitter card metadata, canonical URL, locale `en_KE`
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt`
- `app/manifest.ts` generates the PWA manifest with maskable icons and app shortcuts
- Images served through `next/image` in AVIF and WebP

---

## Project structure

```
app/
  api/            route handlers
  staff/          login and protected dashboard
  layout.tsx      fonts, metadata, providers
  page.tsx        the one page site
components/       UI, one file per section
  staff/          portal UI
data/news.json    JSON CMS for news and events
lib/              site content, storage, mailer, auth, validation
public/assets/    images and icon font from the template zip
styles/           Font Awesome CSS from the template zip
```

Content lives in `lib/site.ts` and `data/news.json`, so copy changes need no component edits.
