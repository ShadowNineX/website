---
name: ShadowNine
description: A cozy developer workshop with a preserved Tails baseline and an Afterglow Miami-dusk theme.
colors:
  tails-night: "#101127"
  tails-night-deep: "#0b1022"
  tails-panel-solid: "#1b1d3e"
  tails-paper: "#fffaf0"
  tails-mist: "#c7c4d9"
  tails-cyan: "#71e7ec"
  tails-cyan-deep: "#1aa8b7"
  tails-violet: "#a78bfa"
  tails-magenta: "#f083c8"
  tails-solar: "#ffd166"
  tails-coral: "#ff8f70"
  tails-green: "#78e0ae"
  gta6-night: "#24112e"
  gta6-night-deep: "#1b0d25"
  gta6-panel: "#351a3e"
  gta6-panel-soft: "#49244e"
  gta6-paper: "#fff5e9"
  gta6-mist: "#e3cde4"
  gta6-cyan: "#9de6e2"
  gta6-cyan-deep: "#32bcb2"
  gta6-violet: "#c29be7"
  gta6-magenta: "#ff80bc"
  gta6-solar: "#ffd18b"
  gta6-coral: "#ffad91"
  gta6-green: "#99e1b7"
typography:
  body:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontWeight: 650
    lineHeight: 1
  gta6-display:
    fontFamily: "Barlow Condensed, Space Grotesk, sans-serif"
    fontSize: "clamp(3.4rem, 5.6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.98
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
rounded:
  control: "0.85rem"
  panel: "1.5rem"
  pill: "999px"
spacing:
  control: "0.5rem 0.65rem"
components:
  button-primary:
    backgroundColor: "{colors.tails-cyan}"
    textColor: "{colors.tails-night}"
    rounded: "{rounded.control}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.tails-paper}"
    rounded: "{rounded.control}"
---

# Design System: ShadowNine

## Overview

The visual system is one cozy workshop in Miami at dusk. Tails is the preserved baseline: deep indigo space, luminous cyan/coral/solar accents, soft panels, Fraunces display type, and readable Space Grotesk body copy. GTA6, named `gta6` and selected by default, keeps the same semantic tokens but retunes them to warm plum, pink, apricot, and teal Afterglow.

Themes are keyed by `html[data-theme]`; shared components consume the same variables. The visitor-facing selector uses native labels and keyboard behavior, persists only an explicit choice under `shadownine-theme`, and has no seasonal date schedule. Yi is unmanaged and keeps its authored identity.

**Key Characteristics:**
- Cozy workshop / warm Miami-dusk Afterglow
- Shared semantic tokens, two palettes
- Plain readable body text; bold display contrast per theme

## Colors

Tails values live in `src/styles/global.css`; GTA6 overrides the same variables in `src/styles/themes.css`. Use semantic variables rather than duplicating palette literals.

### Primary
- **Tails Cyan** (`#71e7ec`) / **Afterglow Teal** (`#9de6e2`): links, primary emphasis, and control states.
- **Tails Coral** (`#ff8f70`) / **Afterglow Apricot** (`#ffad91`): warm accent and display emphasis.

### Secondary
- **Tails Violet** (`#a78bfa`) / **Afterglow Violet** (`#c29be7`): secondary accent.
- **Tails Magenta** (`#f083c8`) / **Afterglow Pink** (`#ff80bc`): highlight and selector/scroll accents.

### Neutral
- Tails `#101127` / GTA6 `#24112e`: page night.
- Tails `#1b1d3e` / GTA6 `#351a3e`: solid panel.
- Tails `#fffaf0` / GTA6 `#fff5e9`: warm paper text.
- Tails `#c7c4d9` / GTA6 `#e3cde4`: mist secondary text.

## Typography

**Body Font:** Space Grotesk (with ui-sans-serif/system fallbacks) in both themes. **Tails Display:** Fraunces (with Georgia). **GTA6 Display:** local Barlow Condensed ExtraBold, falling back to Space Grotesk/sans-serif; the font file is OFL-licensed. **Mono:** JetBrains Mono.

### Hierarchy
- **Display:** Tails Fraunces, 650, `clamp(3.3rem, 8vw, 7.6rem)`; GTA6 Barlow Condensed 800, `clamp(3.4rem, 6.7vw, 6rem)`.
- **Headline:** Fraunces baseline; GTA6 uses Barlow Condensed 800 with `line-height: 0.98` and `letter-spacing: -0.025em`.
- **Body:** Space Grotesk, `1rem`, plain and readable.
- **Label:** Space Grotesk or JetBrains Mono where the existing component calls for a technical label.

## Layout

The shared site shell uses the existing header, hero, content grid, and open content rows. GTA6’s desktop hero is `width: min(100% - 4rem, 86rem)`, two columns at `1.35fr 0.85fr`, with a `4rem` gap and `4rem` block padding. Its heading uses two block lines on wide desktop and the hero artwork is brightened by the existing gradient treatment. Responsive rules are defined at `900px`, `680px`, `480px`, and `360px`; the mobile layout stacks the same content and keeps the native theme selector usable, including the narrow-screen selector gutter. GTA6 grid children and link-group columns use `min-width: 0`, and link-group headers wrap to prevent clipping. Preserve existing content and links. The GTA6 hero uses the supplied `gta6-afterglow.png` artwork as a built-to-WebP source; no HUD, wanted-star, or grit treatment is part of the system.

## Elevation & Depth

Tails uses layered translucent panels and deep ambient shadows (`0 24px 80px rgb(4 5 20 / 0.34)`), with occasional accent glow. GTA6 is intentionally flat for projects, notes, links, privacy content, and article prose: those surfaces have no fill, border, radius, or shadow. The deliberate exception is the profile image feature, whose `0 20px 44px rgb(17 6 25 / 0.25)` shadow supports the full-bleed image and lower fade.

## Shapes

Controls use rounded rectangles (`0.85rem` buttons/nav, `0.75rem` selector). Tails panels are generously rounded (`1.5rem`). GTA6 content rows are open and unrounded; the profile feature alone uses a `0.25rem` image-card radius. Pills remain fully rounded (`999px`). Borders use the theme’s `--line`/`--line-bright` tokens.

## Components

### Buttons
- **Primary:** `.button`, themed accent background and dark text; `0.85rem` radius.
- **Secondary:** `.button-soft`, panel/soft background and paper text.
- **Hover / Focus:** existing transitions and visible `:focus-visible` treatment; preserve the theme’s accent border/glow behavior.

### Selector
- **Style:** native labeled `<select data-theme-select>` with a `0.75rem` radius, theme panel background, and keyboard-native interaction.
- **State:** disabled until the controller synchronizes; explicit changes persist to `shadownine-theme`.

### Navigation
- **Style:** shared `.nav-dial` is a sliding navigation rail, not separate cards. It uses inherited theme colors, three equal destinations, and a `0.2rem` rounded rail that follows the active or hovered route.
- **States:** controls are `2.75rem` (`44px`) minimum height; CSS-only hover/focus moves the rail and nudges icons/arrows. Unmatched routes render no rail. Reduced motion removes these transitions, and compact layouts retain icon controls with accessible labels.

### Open Content Rows
- **Style:** GTA6 projects, notes, links, privacy items, and article prose are transparent, borderless shells with top/bottom rules where already present; projects use open rows with a `1.5rem` icon/title-to-copy grid gap.

### Profile Image Feature
- **Style:** one deliberate full-bleed `4 / 5` image feature with the real image edge-to-edge, black lower fade, and overlaid real name, bio, and flat stats. No nested stat cards. At `360px`, the profile overlay uses `1.15rem` padding and a `1.8rem` name so the identity remains legible without clipping; the homepage featured-note image loads eagerly.

### Signature Artwork
- **Style:** GTA6 Afterglow uses the supplied sunset artwork in the hero; source imagery is converted to WebP for shipping.

### Explore Directory
- **Style:** Explore uses a full-width theme-specific hero, followed by desktop intro/directory columns. Destination rows remain open, real anchors with thin rules and responsive `minmax(0, 1fr)` columns; no generic card shell.
- **Media:** the profile identity feature and live third-party music widgets are retained as real source content. Both themes use their own Tornado hero scene—Miami dusk for GTA6 and a cozy hangar for Tails—while both retain the original shared flying banner. Reduced motion uses the static first frame.

## Do's and Don'ts

### Do:
- **Do** use shared semantic variables so Tails and GTA6 stay mapped to the same roles.
- **Do** keep Space Grotesk as body text and use the theme display face only for headings.
- **Do** preserve native selector labels, keyboard behavior, reduced-motion handling, and explicit-choice persistence.

### Don't:
- **Don't** add a seasonal date schedule or automatic theme rotation.
- **Don't** apply managed theme styling to Yi.
- **Don't** add wanted stars, HUD elements, grit, crime framing, or invented content.
