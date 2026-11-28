# Project Memory — Khemraj Sahu Portfolio (`KHEMPORT`)

## 1. Overview
- **Owner:** Khemraj Sahu (`Khemu's Portfolio.`)
- **Two Core Skills:**
  1. **AI Agents & Automation (Primary Freelance Focus):** n8n workflows, RAG customer bots, DeepSeek & OpenAI integrations, Pinecone vector stores, and automated pipelines.
  2. **Web Development (Secondary Skill):** Full-stack web apps, clean responsive interfaces, interactive motion, and Python-backed digital products.
- **Purpose:** Personal portfolio website organized around these two core skill tracks, showcasing projects, capabilities, and contact/GitHub links.
- **Location / Availability:** India · Open to remote / Available for freelance (`2024 — Present`).
- **Custom Domain:** `khemshop.com` (configured via `CNAME`, structured for static hosting such as GitHub Pages).
- **GitHub Profile:** `https://github.com/khemraj8345`

---

## 2. File Structure
```text
KHEMPORT-main/
├── CNAME                                   # Custom domain: khemshop.com
├── README.md                               # Minimal placeholder ("this is the my portfolio site")
├── index.html                              # Entire site: HTML, inline CSS, and inline vanilla JS
├── og-image.png                            # 1200x630 Open Graph / Twitter social preview card
├── resume.pdf                              # Downloadable 1-page CV linked from #about
├── robots.txt                              # Allow all crawlers + sitemap pointer
├── sitemap.xml                             # Sitemap listing https://khemshop.com/
├── agent/
│   └── memory.md                           # Project memory and technical reference
└── assets/
    ├── ai-customer-bot.png                 # n8n RAG AI Customer Bot workflow screenshot
    ├── favicon.svg                         # 64x64 SVG monogram icon (#111034 bg, #f7f5ff & #a878ec)
    ├── hospital-platform.png               # Screenshot of Bansal Nursing Home live site
    ├── khemraj-portrait-optimized.jpg      # Hero portrait image of Khemraj Sahu
    └── whatsapp.png                        # 512x512 WhatsApp icon used in Contact section
```

---

## 3. Tech Stack & Architecture
- **Architecture:** Zero-build, single-file static site (`index.html`, 159 lines) with no framework, bundler, or external JS libraries.
- **Styling:** Inline `<style>` using CSS custom properties, CSS Grid, Flexbox, image thumbnails for AI Customer Bot & Hospital Management Platform, and pure-CSS illustration for Amul Cool.
- **SEO & Social Preview:** Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) and `twitter:card` tags in `<head>`, plus `og-image.png`, `robots.txt`, and `sitemap.xml`.
- **Typography:** Google Fonts (`Manrope` 400/500/600/700/800 and `DM Mono` 400/500) loaded via `@import`, plus system serif (`Georgia, 'Times New Roman', serif`) for italic emphasis.
- **Scripting:** Inline vanilla JS at the bottom of `<body>` for the mobile nav drawer and hero role typewriter animation, plus the official `@n8n/chat` ES module CDN widget (`https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js` + `style.css`) for the lower-right floating AI agent chat.

---

## 4. Design System & Styling Notes
- **Theme:** Deep indigo/midnight dark theme layered as overrides in `<style>` on top of an earlier light-paper base theme.
  - `--paper` (page background): `#080722`
  - Nav & `#about` section surface: `#111034`
  - `--ink` (primary text): `#f7f5ff`
  - `--muted` (secondary text): `#a8a4c5`
  - `--line` (borders/dividers): `#302c59`
  - Accent (`--green` variable repurposed to violet): `#a878ec`
  - Contact box: Diagonal gradient (`#241b4a` → `#352354` → `#202849`) with `#d5c5ff` CTA pill.
- **Project & Skill Organization:**
  - `#work` separates projects under `.skill-group-head` sections (`AI Agents & Automation` first, `Web Development` second).
  - `.project-featured` spans full width (`grid-column: 1 / -1`) in a horizontal 2-column split on desktop (`> 700px`), displaying `assets/ai-customer-bot.png` inside `.bot-art` (`background: #1c1c1e`, `object-fit: contain`).
  - `#services` uses `.skills-two` (2-column grid on desktop, 1-column on mobile) with two distinct `.skill-card` blocks (`01 AI Agents & Automation`, `02 Web Development`).
- **Responsive Breakpoint:** `@media (max-width: 700px)` collapses `.project-featured`, `.projects`, and `.skills-two` into single columns and switches navigation to a toggleable dropdown drawer (`.nav-links.open`).
- **Accessibility & Motion:**
  - Respects `@media (prefers-reduced-motion: reduce)` in both CSS and JS.
  - Uses `aria-expanded` / `aria-controls` on `.menu-toggle`, descriptive `alt` on project/hero images, `role="img"` + `aria-label` on CSS art cards, and `:focus-visible` outlines on `.project-link`.

---

## 5. Page Sections & Content Map (`index.html`)
1. **Header (`.nav`)**: Brand link (`#top`), nav links (`Home`, `About`, `Services`, `Projects`), mobile `.menu-toggle` button. (Note: `.nav-cta` "Let's talk" exists in HTML but is hidden via `display: none` in the dark-theme CSS override.)
2. **Hero (`#top`)**:
   - Headline: `Hi, my name is Khemraj / I'm a passionate / [rotating role]|` (starts on `AI Agent Builder`)
   - Action buttons: `Explore my work` (`#work`) and `Visit GitHub ↗` (`https://github.com/khemraj8345`)
   - Visual: `assets/khemraj-portrait-optimized.jpg` framed with an asymmetric rounded corner (`border-radius: 9px 9px 95px 9px`) and offset violet border.
3. **Meta Row**: `Selected work` · `2024 — Present` · `India · Open to remote`
4. **Featured Projects (`#work`)**:
   - **Skill 01 — AI Agents & Automation**
     - **01 / AI Agent · n8n — AI Customer Bot** (`AI & N8N`, `.project-featured`)
       - Demo Video URL (Loom): `https://www.loom.com/share/7a756b3de934494ba978bc82e35ee8ab`
       - Visual: `assets/ai-customer-bot.png` (n8n workflow: `When chat message received` → `AI Agent` connected to `DeepSeek Chat Model` and `Pinecone Vector Store1` + `Embeddings OpenAI1`) with `▶ WATCH LOOM DEMO` badge.
       - Tags: `n8n Automation`, `DeepSeek`, `Pinecone RAG`, `OpenAI Embeddings`
   - **Skill 02 — Web Development**
     - **01 / Healthcare Platform — Hospital Management Platform** (`FULL STACK`)
       - Live URL: `https://khemraj8345.github.io/bunsal-nursing-home/`
       - Visual: Screenshot of the live site (`assets/hospital-platform.png`).
       - Tags: `Patient experience`, `Appointment booking`, `Admin dashboard`
     - **02 / Brand Experience — Amul Cool — Animated Website** (`WEB DESIGN`)
       - Live URL: `https://amul-cool-xi.vercel.app/#top`
       - Visual: Pure-CSS illustrated Amul Cool bottle with sunray rings and leaf (`.milk-card`, `.sunray`, `.float-leaf`).
       - Tags: `Web animation`, `Brand storytelling`, `Responsive design`
5. **About & Services (`#about`, `#services`)**:
   - Heading: `Curious by nature. Builder by choice.` + `Download CV ↓` button linking to `resume.pdf`.
   - Copy: Highlights both core skills (AI Agents & n8n Automation as primary freelance focus, alongside full-stack Web Development).
   - Two Separate Skill Cards (`.skills-two` / `#services`):
     - `01` **AI Agents & Automation** — n8n workflows, RAG customer bots, DeepSeek & OpenAI integrations, Pinecone vector stores, and automated pipelines.
     - `02` **Web Development** — Full-stack web apps, clean responsive interfaces, interactive motion, and Python-backed digital products.
6. **Contact (`#contact`)**:
   - Heading: `Let's make something useful.`
   - Actions: Selectable plain text `hittu251086@gmail.com` beside icon-only WhatsApp button (`assets/whatsapp.png` → `https://wa.me/916267140394`).
7. **Footer**: `© 2026 Khemraj Sahu`, `Back to top ↑`, `Made with care.`

---

## 6. Interactive Behavior (`<script>` in `index.html`)
- **Mobile Navigation:** `.menu-toggle` toggles `.open` on `#nav-links`, updates `aria-expanded`, swaps `☰` / `×`, and auto-closes when any nav link is clicked.
- **Role Typewriter:** Cycles `#role-text` through `['AI Agent Builder', 'n8n Automation Expert', 'Web Developer']` (55ms delete, 95ms type, 1300ms hold after typing, 1600ms initial delay). Disabled when `prefers-reduced-motion: reduce` matches.
- **Floating AI Agent Chat (`@n8n/chat`):** Lower-right floating launcher and chat window connected to `https://khemludev.app.n8n.cloud/webhook/7f1f19cf-a967-411b-931e-db6e40cb92cd/chat`, themed with `--chat--*` CSS custom properties (`#a878ec` accent, `#111034` header, `Manrope` font). Requires `khemshop.com` (and any preview origin) to be listed in the n8n Chat Trigger node's Allowed Origins (CORS).

---

## 7. Changelog & Maintenance Notes
- **2026-11-28 — Portfolio Polish, Real CV, SEO, Social Preview & WhatsApp CTA:**
  - Added `og-image.png`, Open Graph/Twitter meta tags, `robots.txt`, and `sitemap.xml`.
  - Replaced hospital mockup with `assets/hospital-platform.png` and separated Web Development project numbering (`01`, `02`).
  - Added `resume.pdf` + `Download CV ↓` button in `#about`, removed hero `.eyebrow`, updated copy (`2024 — Present`, `Skill 01`), and added visible selectable email + icon-only WhatsApp button (`assets/whatsapp.png` → `https://wa.me/916267140394`) in `#contact`.
- **2026-11-27 — Wired `Get in touch ↗` to Direct Gmail Compose & Consolidated Memory:**
  - Updated `#contact` CTA pill in `index.html` to `https://mail.google.com/mail/?view=cm&fs=1&to=hittu251086@gmail.com` (`target="_blank" rel="noopener noreferrer"`) with no layout or CSS changes.
  - Moved project memory exclusively to `agent/memory.md` and removed root `memory.md`.
- **2026-11-27 — Added n8n Floating Chat Widget:**
  - Embedded `@n8n/chat` stylesheet and ES module in `index.html` wired to `https://khemludev.app.n8n.cloud/webhook/7f1f19cf-a967-411b-931e-db6e40cb92cd/chat` in the lower-right corner, styled to match the portfolio's dark indigo/violet theme.
- **2026-11-27 — Dual-Skill Structure & AI Customer Bot Screenshot:**
  - Split skills and projects into two explicit tracks: **01 · AI Agents & Automation** (primary) and **02 · Web Development** (secondary) in both `#work` and `#services` (`.skills-two`).
  - Attached n8n workflow screenshot (`assets/ai-customer-bot.png`) to the **AI Customer Bot** project card and updated stack details (`DeepSeek`, `Pinecone RAG`, `OpenAI Embeddings`).
- **Remaining Gaps:**
  - **Layered CSS Debt:** `index.html` retains older light-theme CSS rules overridden by dark-theme rules.
  - **Typing Caret Styling:** `.typing-caret` has no dedicated CSS blink animation rule.
  - **Documentation:** `README.md` currently contains only a single-line description.
