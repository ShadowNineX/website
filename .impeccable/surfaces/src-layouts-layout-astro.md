---
version: 1
slug: "src-layouts-layout-astro"
primary_target: "src/layouts/Layout.astro"
related_targets: ["src/pages/index.astro","src/styles/global.css"]
---

# Website themes

Scope: shared site chrome and themed surfaces, with homepage as the visual anchor. Mode: Experience; article bodies remain Read.

Confirmed: preserve existing Tails theme and content; GTA6 is the first-visit default; remember explicit theme choices. Mockups precede implementation. User's supplied art is palette reference, not a requirement to show characters, guns, logos, or crime framing.

## Direction contract

THESIS: The same cozy ShadowNine workshop in Miami at dusk. GTA6 brings a distinct sunset scene without adding game HUDs or replacing the site's content.

OWN-WORLD: Pink-to-apricot sky, deep plum reading surfaces, teal links, warm white text, bold condensed display headings, plain body text. Painted palms and motel-sign geometry; restrained chrome outlines on small controls.

STORY: Visitors recognize ShadowNine, browse builds or notes, and discover a clearly labeled Tails/GTA6 theme selector. Their selection survives navigation and return visits.

FIRST VIEWPORT: Retain the existing header, large left headline, supporting paragraph and two working links, plus the real profile at right. Test three hero compositions: full-bleed sunset, a split sunset art panel, and a dusk scene behind a quiet reading field. No invented claims. Mobile stacks the same content with a usable theme selector.

FORM: User-pinned Miami dusk world overrides unrelated catalog costumes; seed b81211be. The seven considered carriers were sunset postcard, Ocean Drive motel frontage, tropical album sleeve, Art Deco wayfinding, beach café menu, illustrated coastal travel guide, and dusk panorama. The panorama supplies a scene across the hero while content stays legible. Catalog challengers are declined on audience identification and product clarity under this explicit brief. Retain their disciplines of readable hierarchy, coherent geometry, responsive artwork, content density, consistent controls, and purposeful motion without adopting their motifs.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Workflow

Comp-first explicitly selected. Generate and display three mockups for one approval point. No implementation until the user approves or delegates the choice. Use a design reviewer and a separate correctness reviewer. Preserve the standalone Yi tribute's authored visual identity.

Approved comp: .impeccable/mocks/03-afterglow.png. User selected 3 - Afterglow on November 2, 2026. Preserve real source copy/data instead of generated placeholder text/stats. Signature interaction: instant remembered theme selection; restrained existing entrance motion respects reduced motion.

## User refinement after live preview
The user explicitly changed the old comp's card composition: remove generic rounded shells and let GTA6 feel like an experience with flowing page content. Flatten projects into open rows, remove nested panels and background fills, keep the original Tails theme untouched. For the one deliberate profile feature, the user supplied their screenshot and explicitly requested: 'make the image take full card and make a black fade at the bottom'. Use the original live avatar edge-to-edge with a black lower fade and overlaid real name/bio/stats; no nested stat cards. These latest user decisions supersede old mockup card topology. Keep the Miami scene, brighten the desktop sky, maintain a two-line wide-desktop heading and readable body, and preserve a narrow-screen selector gutter.

Raster source exception: profile-photo is the incumbent live GitHub avatar, not a newly produced plate. The local review copy is evidence only. Source preservation is an explicit project requirement; never replace the live image to satisfy a static string scanner.

## Latest user refinement

The latest approved homepage refinement permits companion and icon changes in both themes while preserving the incumbent palettes, fonts, copy, links, and Tails trust model. `ThreeBackground.astro` keeps the Tails sky intact; GTA6 uses static, pointer-transparent, low-opacity Art Deco arches, sun, and horizon curves. The homepage tech surface is `17` colors and keeps the existing `tails-trust-tools-home.png` image-led companion with exact copy and links. `home-workshop.css` stacks the companion at `4:3` on mobile at `680px` and respects reduced motion.

Existing article artwork is reused with its source provenance; it is not a newly generated asset. No source edits, build, server, or browser verification are included in this brief update.
