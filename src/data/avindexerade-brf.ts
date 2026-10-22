/**
 * Gren 179 (#9, Marknadschefens arbetslista 2026-10-21, FÖRBEREDD OCH HÅLLEN): de BRF-ortssidor som finns på /brf/<ort> (37 ortssidor, 99 % lika, BRF-spåret är pausat) görs `noindex, follow`
 * tills de har egen text. De ligger kvar på sina adresser, står inte i sajtkartan och raderas aldrig. Indexerbar → noindex täcks inte av Vidars stående ja; flaggan ska stå på `false` tills
 * Vidar sagt ja. Reversibelt: sätt flaggan till false. Bara relativa importer.
 * Så här sätts det på: flaggan till true, /brf/<ort>-raderna ur den spårade public/sitemap.xml (provet canonical.test kräver att inget noindex-sida står där), provet paket179 byts mot sin spegelbild.
 */
import { brfLocationSlugs } from "./brf-locations";

export const BRF_NOINDEX = false;

export const brfNoindexVagar = (): string[] => (BRF_NOINDEX ? brfLocationSlugs.map((s) => `/brf/${s}`) : []);
