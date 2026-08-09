import type { ReactNode } from 'react'
import { GemArt } from './art/GemArt'
import { GearArt } from './art/GearArt'
import { CreatureArt } from './art/CreatureArt'
import { ArtifactArt } from './art/ArtifactArt'
import { FactArt } from './art/FactArt'
import {
  TrailBootsArt,
  NightHeronArt,
  RoseQuartzArt,
  GhostKoiArt,
  StormShellArt,
  SecondWindArt,
  TramTokenArt,
  CitySparrowArt,
} from './art/minis'
import type { RarityTier } from './art/RarityGlyph'

/** The --edge modifier suffixes defined in cards.css. */
export type CardEdge = 'gem' | 'legendary' | 'rare' | 'artifact' | 'fact' | 'epic' | 'common' | 'uncommon'

export interface CardData {
  edge: CardEdge
  stage: string
  name: string
  xp: string
  art: ReactNode
  band: string
  stats: { v: string; label: string; volt?: boolean }[]
  use: { name: string; val: string; text: string }
  found: { where: string; pct: number }
  flavor: string
  foot: { left: string; right: string }
  ariaLabel: string
}

export const gemCard: CardData = {
  edge: 'gem',
  stage: 'Stage 2',
  name: 'Harbor Sapphire',
  xp: '240',
  art: <GemArt />,
  band: 'Legendary Gem · Harbor Loop zone',
  stats: [
    { v: '5.0', label: 'km run' },
    { v: '6,830', label: 'steps' },
    { v: '+240', label: 'xp gained', volt: true },
  ],
  use: {
    name: 'Shard Rush',
    val: '2×',
    text: 'Play before a run — every zone XP pickup counts double for the next 24 hours.',
  },
  found: { where: 'Waterfront zones', pct: 78 },
  flavor: 'Cut from harbor light. A stone this clear surfaces about once a season — almost always at dawn.',
  foot: { left: 'illus. FINDRUN · 1 in 900 runs', right: '142 / 500' },
  ariaLabel: 'Gem card: Harbor Sapphire, Stage 2 Legendary — 240 XP, found most in waterfront zones',
}

export const heroCardAriaLabel =
  'FindRun collectible card: Harbor Sapphire, Stage 2 Legendary gem — 5.0 km, 6,830 steps, 240 XP gained, found most in waterfront zones'

export const gearCard: CardData = {
  edge: 'legendary',
  stage: 'Stage 3',
  name: 'Golden Shoes',
  xp: '300',
  art: <GearArt />,
  band: 'Legendary Gear · Stadium Mile zone',
  stats: [
    { v: '10.0', label: 'km run' },
    { v: '13,600', label: 'steps' },
    { v: '+300', label: 'xp gained', volt: true },
  ],
  use: {
    name: 'Winged Pace',
    val: '−0:15',
    text: 'Equip for one run — trims 15 s/km off your pace target and doubles streak credit.',
  },
  found: { where: 'Stadium & track zones', pct: 8 },
  flavor: 'Only surfaces after a personal best. Gold where the laces should be.',
  foot: { left: 'illus. FINDRUN · after a PB', right: '009 / 500' },
  ariaLabel: 'Gear card: Golden Shoes, Stage 3 Legendary — 300 XP, surfaces after a personal best',
}

export const creatureCard: CardData = {
  edge: 'rare',
  stage: 'Stage 1',
  name: 'Harbor Fox',
  xp: '90',
  art: <CreatureArt />,
  band: 'Rare Creature · Greenway zone',
  stats: [
    { v: '4.4', label: 'km run' },
    { v: '5,900', label: 'steps' },
    { v: '+90', label: 'xp gained', volt: true },
  ],
  use: {
    name: 'Trail Guide',
    val: '+1',
    text: 'Runs alongside you on the map. Reveals one hidden zone on every dawn run.',
  },
  found: { where: 'Park & greenway zones', pct: 41 },
  flavor: 'Seen at dawn, gone by seven. Keeps pace with runners who hold a steady rhythm.',
  foot: { left: 'illus. FINDRUN · dawn runs', right: '217 / 500' },
  ariaLabel: 'Creature card: Harbor Fox, Stage 1 Rare — 90 XP, seen on dawn runs in park zones',
}

export const artifactCard: CardData = {
  edge: 'artifact',
  stage: 'Stage 3',
  name: 'The Unmarked Obelisk',
  xp: '160',
  art: <ArtifactArt />,
  band: 'Epic Artifact · Old Quarry zone',
  stats: [
    { v: '8.2', label: 'km run' },
    { v: '11,240', label: 'steps' },
    { v: '+160', label: 'xp gained', volt: true },
  ],
  use: {
    name: 'First Sighting',
    val: '+5%',
    text: 'Your handle is engraved on the first find. Display it in your deck for +5% XP on every run.',
  },
  found: { where: 'Old quarry zones', pct: 12 },
  flavor: 'No map marks it. The first runner to reach it gets to name it — this one is still unexplained.',
  foot: { left: 'illus. FINDRUN · one known copy', right: '071 / 500' },
  ariaLabel: 'Artifact card: The Unmarked Obelisk, Stage 3 Epic — 160 XP, one known copy',
}

export const factCard: CardData = {
  edge: 'fact',
  stage: 'Stage 1',
  name: "Runner's High",
  xp: '60',
  art: <FactArt />,
  band: 'Rare Fact · Body & Mind set',
  stats: [
    { v: '3.1', label: 'km run' },
    { v: '4,120', label: 'steps' },
    { v: '+60', label: 'xp gained', volt: true },
  ],
  use: {
    name: 'Deck Piece',
    val: '4 / 12',
    text: 'Slots into the Body & Mind deck. Complete all 12 fact cards to earn the set badge.',
  },
  found: { where: 'Riverside zones', pct: 64 },
  flavor: "The runner's high rides on endocannabinoids — molecules small enough to slip into the brain.",
  foot: { left: 'illus. FINDRUN · morning runs', right: '308 / 500' },
  ariaLabel: "Fact card: Runner's High, Stage 1 Rare — 60 XP, Body and Mind set",
}

export interface GalleryEntry {
  card: CardData
  type: string
  tag: string
  tagTier: RarityTier
  blurb: string
  delay: number
}

export const galleryEntries: GalleryEntry[] = [
  {
    card: gemCard,
    type: 'Gem',
    tag: 'valuable',
    tagTier: 'legendary',
    blurb: 'Cut stones with a collection value. The chase cards — hunted, traded, ranked.',
    delay: 0,
  },
  {
    card: gearCard,
    type: 'Gear',
    tag: 'equip',
    tagTier: 'legendary',
    blurb: 'Golden shoes, storm shells, boots that survive winters. Equip one to change your next run.',
    delay: 1,
  },
  {
    card: creatureCard,
    type: 'Creature',
    tag: 'wild',
    tagTier: 'rare',
    blurb: 'Animals that live along the routes — each shows only at certain hours, in certain zones.',
    delay: 2,
  },
  {
    card: artifactCard,
    type: 'Artifact',
    tag: 'unseen',
    tagTier: 'epic',
    blurb: 'Discoveries never catalogued before. Find one first and your name is on it — forever.',
    delay: 1,
  },
  {
    card: factCard,
    type: 'Fact',
    tag: 'knowledge',
    tagTier: 'rare',
    blurb: 'Real facts about your body, your city and the run. Collect sets to complete decks.',
    delay: 2,
  },
]

export interface MiniData {
  tier: RarityTier
  name: string
  xp: string
  type: string
  art: ReactNode
}

export const miniCards: MiniData[] = [
  { tier: 'common', name: 'Trail Boots', xp: '20', type: 'Common Gear', art: <TrailBootsArt /> },
  { tier: 'epic', name: 'Night Heron', xp: '180', type: 'Epic Creature', art: <NightHeronArt /> },
  { tier: 'uncommon', name: 'Rose Quartz', xp: '40', type: 'Uncommon Gem', art: <RoseQuartzArt /> },
  { tier: 'legendary', name: 'Ghost Koi', xp: '260', type: 'Legendary Creature', art: <GhostKoiArt /> },
  { tier: 'rare', name: 'Storm Shell', xp: '70', type: 'Rare Gear', art: <StormShellArt /> },
  { tier: 'uncommon', name: 'Second Wind', xp: '35', type: 'Uncommon Fact', art: <SecondWindArt /> },
  { tier: 'epic', name: 'Old Tram Token', xp: '150', type: 'Epic Artifact', art: <TramTokenArt /> },
  { tier: 'common', name: 'City Sparrow', xp: '15', type: 'Common Creature', art: <CitySparrowArt /> },
]
