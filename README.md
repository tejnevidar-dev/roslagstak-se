# RoslagsTak – roslagstak.se

Marknadsföringswebbplats för RoslagsTak, SEO-optimerad, med ett enkelt admin-läge för
inkomna offertförfrågningar. Byggd med Vite + React + TypeScript + Tailwind, Supabase
som backend (auth + databas).

Se [docs/lovable-exit-plan.md](./docs/lovable-exit-plan.md) för status på migreringen
bort från Lovable (samma resa som CRM-systemet, `admin.vt6`, redan gjort).

## Development

```sh
npm i
npm run dev
```

## Scripts

```sh
npm run build          # produktionsbygge
npm run build:dev      # dev-läge-bygge
npm run lint            # eslint
npm run test             # vitest
npm run check:sitemap    # validera sitemap mot rutter
npm run validate:schema  # validera structured data efter bygge
```
