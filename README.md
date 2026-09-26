# Retrotopia — E-Museum Website

Step into the future at Retrotopia, a concept museum where art, innovation, and history converge. Browse ongoing and upcoming exhibitions, meet the artisans behind every piece, tour the exhibition gallery, and book tickets — all from a single, animated, dark/light-mode-aware site.

**Live site:** https://isha2923.github.io/retrotopia-e-museum/

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-black?style=flat&logo=three.js&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222?style=flat&logo=github)

---

## Overview

Retrotopia is a multi-page static website for a fictional futuristic museum. It was originally built as an ISOC-2023 project and has since been refactored into a cleaner file structure with a shared design system, functional light/dark theming, scroll-triggered animations, and a Three.js-powered hero section.

## Features

- **Multi-page site** — Home, Gallery, Ongoing/Upcoming Exhibitions, Artisan & Stories, Tickets & Visit, and Contact Us pages sharing one consistent header, footer, and design system.
- **Light / dark mode toggle** — a single switch in the navbar that persists the user's preference (via `localStorage`) and applies instantly across every page, with no flash of the wrong theme on load.
- **Contact page with embedded Google Map** — an interactive, embedded map pinned to the museum's location alongside the contact form and details.
- **Scroll-reveal animations** — cards, hero copy, and section content animate into view as the user scrolls, using `IntersectionObserver` for performance.
- **Three.js hero background** — a subtle, GPU-friendly animated particle/starfield layer behind the homepage hero for a more premium, portfolio-ready first impression.
- **Responsive design** — fluid layouts from mobile through desktop using CSS Grid, Flexbox, and `clamp()`-based type scales.
- **Newsletter & contact forms** — client-side demo forms with success-state feedback (no backend required).
- **Multi-language selector UI** — language switcher in the navbar (English, French, German, Spanish).

## Tech Stack

| Layer | Tech |
|---|---|
| Structure | Semantic HTML5 |
| Styling | Hand-written CSS3 (custom properties / theming, Grid, Flexbox) |
| Interactivity | Vanilla JavaScript (no framework, no build step) |
| 3D / Motion | [Three.js](https://threejs.org/) (CDN) for the hero background |
| Hosting | GitHub Pages |

No build tools, bundlers, or package managers are required — it's a plain static site.

## Project Structure

```
retrotopia-e-museum/
├── index.html              # Home page
├── gallery.html             # Exhibition gallery
├── tickets.html             # Tickets & visiting info
├── artandstories.html       # Artisans & articles
├── contactus.html           # Contact page (form + embedded map)
├── css/
│   └── theme.css             # Shared design system (colors, layout, components, dark/light theme)
├── js/
│   └── main.js               # Shared behaviour: theme toggle, nav, reveal animations, forms, Three.js init
├── Artisan/                 # Artisan images
├── Languages/                # Language flag icons
├── Ongoing Exhib/            # Ongoing exhibition images
├── Upcoming/                 # Upcoming exhibition images
├── Our Gallery/              # Gallery images
├── logo.jpeg
└── README.md
```

## Running Locally

No dependencies to install — just serve the folder statically.

```bash
git clone https://github.com/Isha2923/retrotopia-e-museum.git
cd retrotopia-e-museum

# any static server works, e.g.:
python -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000` in your browser.

## Deployment

The site is deployed via **GitHub Pages** directly from the `main` branch. Any push to `main` updates the live site at the link above within a couple of minutes. No CI/CD pipeline or build step is needed since this is a static site.

## Roadmap

- [ ] Replace demo contact/newsletter forms with a real backend or form service (e.g. Formspree)
- [ ] Wire up the language switcher to actual i18n content
- [ ] Add a ticket checkout flow
- [ ] Accessibility pass (focus states, ARIA labels, color-contrast audit for both themes)

## Credits

Built and maintained by [Isha2923](https://github.com/Isha2923). Originally created for ISOC 2023.

## License

This project is currently unlicensed for reuse. If you'd like to reuse this code, please reach out first.
