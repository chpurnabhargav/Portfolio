# Purna Bhargav — Portfolio

Personal portfolio of Purna Bhargav Challagundla: Full Stack Developer, B.Tech CS at KLH University, and Software Engineer Intern at Visa (Summer 2026).

**Live:** https://portfolio-purna-bhargavs-projects.vercel.app

## Features

- **Light and dark themes.** Follows the OS setting until the visitor picks one, with no flash on load.
- **Project showcase** with an illustrated cover for each project, plus source and live-demo links.
- **Live coding stats** from LeetCode, CodeChef, Codeforces, and GitHub, with a combined contest-rating chart on one shared axis.
- **Resilient data loading.** Requests time out after 12s, results are cached for an hour, and the last good value is reused if an API is down.
- **Accessible:** skip link, keyboard-friendly menu, reduced-motion support, screen-reader data table for the chart.
- **Shareable:** deep links such as `/#contact` open at the right section, and link previews use `public/og-image.png`.

## Tech

React 19, Vite 6, Framer Motion, react-icons. Plain CSS with design tokens in `src/index.css`.

## Run locally

```bash
npm install
npm run dev      # start the dev server
npm run lint     # ESLint
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Editing content

All content lives in data arrays at the top of `src/HomePage.jsx`: `PROJECTS`, `EXPERIENCE`, `SKILL_GROUPS`, `EDUCATION`, `CERTIFICATIONS`, and the coding-profile handles. Replace `public/resume.pdf` and `public/img.jpg` to update the resume and photo.

The About stats come from that data, so adding a project or certification updates the counts automatically. The contest count is fetched live, and `CONTESTS_FALLBACK` is shown if a rating API is down.
