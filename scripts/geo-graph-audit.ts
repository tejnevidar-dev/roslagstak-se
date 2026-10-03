/**
 * Geografisk graf-audit (SEO-programmet Phase 2.7 "förstärk den geografiska grafen").
 *
 * location → parent region, location → nearby locations, location → services och
 * project → location finns redan i koden (LocationPage.tsx, ProjectPage.tsx). Det här
 * scriptet reviderar att grafen faktiskt hänger ihop utan trasiga eller ensidiga länkar:
 *
 *  - varje namn i nearbyLocations måste matcha en riktig ort (annars tystnar länken)
 *  - nearbyLocations bör vara ömsesidigt (A grannar B ⇒ B bör granna A)
 *  - location.region måste finnas i regionSlugs, regionOrder, regionIntros och regionTexts
 *    (annars blir breadcrumb/hub-länken /omraden generisk i stället för regionens egen sida)
 *  - varje region i regionOrder måste ha minst en ort (annars är hubben en tom sida)
 *
 * Kör: bunx tsx scripts/geo-graph-audit.ts
 */
import { locations } from "../src/data/locations";
import { regionOrder, regionSlugs, regionIntros } from "../src/data/regions";
import { regionTexts } from "../src/data/region-texts";

const byName = new Map(locations.map((l) => [l.name, l]));
const issues: string[] = [];

/* ---------- 1. nearbyLocations: trasiga namn ---------- */
for (const loc of locations) {
  for (const name of loc.nearbyLocations) {
    if (!byName.has(name)) {
      issues.push(`"${loc.name}" (${loc.slug}) har grannen "${name}" — ingen ort med det namnet finns.`);
    }
  }
}

/* ---------- 2. nearbyLocations: ensidiga (ej ömsesidiga) grannar ---------- */
const asymmetric: string[] = [];
for (const loc of locations) {
  for (const name of loc.nearbyLocations) {
    const other = byName.get(name);
    if (other && !other.nearbyLocations.includes(loc.name)) {
      asymmetric.push(`"${loc.name}" → "${other.name}", men inte tillbaka`);
    }
  }
}

/* ---------- 3. location.region måste finnas i alla regionsregister ---------- */
const regionSet = new Set(regionOrder);
for (const loc of locations) {
  if (!regionSet.has(loc.region as (typeof regionOrder)[number])) {
    issues.push(`"${loc.name}" (${loc.slug}) har region "${loc.region}" — finns inte i regionOrder.`);
  }
  if (!regionSlugs[loc.region]) {
    issues.push(`"${loc.name}" (${loc.slug}): regionen "${loc.region}" saknar slug i regionSlugs → länkar till /omraden i stället för egen hub.`);
  }
  if (!regionIntros[loc.region]) {
    issues.push(`Regionen "${loc.region}" (via "${loc.name}") saknar text i regionIntros.`);
  }
  if (!regionTexts[loc.region] || regionTexts[loc.region].body.length === 0) {
    issues.push(`Regionen "${loc.region}" (via "${loc.name}") saknar godkänd regiontext i region-texts.ts.`);
  }
}

/* ---------- 4. tomma regioner ---------- */
const regionsWithLocations = new Set(locations.map((l) => l.region));
for (const region of regionOrder) {
  if (!regionsWithLocations.has(region)) {
    issues.push(`Regionen "${region}" finns i regionOrder men har ingen ort i locations.ts → tom hubbsida.`);
  }
}

/* ---------- 5. dubbletter ---------- */
const seenSlugs = new Map<string, number>();
for (const loc of locations) seenSlugs.set(loc.slug, (seenSlugs.get(loc.slug) ?? 0) + 1);
for (const [slug, count] of seenSlugs) {
  if (count > 1) issues.push(`Slug "${slug}" finns ${count} gånger i locations.ts.`);
}

/* ---------- rapport ---------- */
console.log(`\nGeografisk graf-audit — ${locations.length} orter, ${regionOrder.length} regioner\n`);
console.log(`Fel (blockerande länkar): ${issues.length}`);
for (const i of issues) console.log(`  - ${i}`);

console.log(`\nEnsidiga grannrelationer (kvalitetsvarning, inte fel): ${asymmetric.length}`);
for (const a of asymmetric.slice(0, 40)) console.log(`  - ${a}`);
if (asymmetric.length > 40) console.log(`  … och ${asymmetric.length - 40} till`);

if (issues.length === 0) console.log("\n✓ Inga trasiga länkar i den geografiska grafen.\n");
else console.log("");

process.exit(issues.length ? 1 : 0);
