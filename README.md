# Lecture Provider

A premium, responsive landing page for a fictional online lecture library
covering **GATE**, **UPSC General Studies** and **UPSC optional subjects**.
**Frontend showcase only** — no backend, no auth, no payments, no database.
Every button is a visual/demo interaction and every course is sample data.

## Run

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

Or just open `index.html` directly in a browser — there is no build step and no dependencies
beyond the Google Fonts stylesheet.

## Flow

1. **Exam chooser** (the front screen): three track cards — GATE, UPSC, Optional Subjects.
2. **Catalogue**: picking an exam reveals the site with that exam's hero copy, stats,
   subject chips and lectures only. The header shows a pill with the current exam;
   clicking it (or any "Change exam" control) returns to the chooser.

The choice is remembered in `localStorage`, so a returning visitor lands straight in
their catalogue instead of re-picking. The header pill always shows which exam is active
and is the way back.

## Structure

```
index.html      markup: header, exam chooser, hero, subjects, lectures, promo, newsletter, footer
css/styles.css  design tokens → base → layout → components
js/data.js      LP_TRACKS (3 exam tracks) + LP_COURSES (24 lectures, 8 per track)
js/app.js       rendering + UI behaviour (filter, wishlist, reveals, toasts)
```

## Notes

- **One reusable card template** (`courseCard()` in `js/app.js`) renders every
  lecture from `LP_COURSES` — no repeated hardcoded markup.
- Adding an exam is data-only: append to `LP_TRACKS` (with its `subjects` list) and
  tag lectures with that `track` id. No markup or CSS changes needed.
- Course artwork is generated as inline SVG, so the page is fully self-contained
  and has no external image requests or broken placeholders.
- Grid: 4 columns desktop / 2 tablet / 1 mobile, 24px gap. Mobile-first CSS.
- Subject chips are rebuilt per exam and do real client-side filtering.
- Search is real: it filters on lecture name, subject, faculty and level, shows a live
  result count, and has a clear button plus an empty state with "Clear filters".
- The header search icon focuses the search field rather than firing a fake toast.
- Prices are shown in ₹ since the tracks are Indian competitive exams.
- Accessibility: skip link, landmarks, visible focus rings, `aria-pressed` toggles,
  live regions for the grid and form status, and `prefers-reduced-motion` support.
