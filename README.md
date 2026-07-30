# EmpireCraft website

The EmpireCraft community site is a static Next.js site built for GitHub Pages.

## Local preview

```sh
npm install
npm run dev
```

## Discord announcements

The website reads `public/news.json`. A scheduled GitHub Action refreshes that
file from the Discord announcements channel every six hours, removes role and
everyone pings, converts Discord dates, and assigns predictable categories. No
AI service is required.

Before enabling the workflow, add a repository Actions secret named
`DISCORD_BOT_TOKEN`. The token is only used by the Action and is never included
in the browser bundle.

## GitHub Pages

Enable Pages with **GitHub Actions** as the source. The included deployment
workflow builds the static export and publishes it automatically from `main`.
