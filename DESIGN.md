---
name: Hitesh Saai
description: A figure book. Every claim sits beside the exhibit that proves it.
colors:
  paper: "#f7f7f7"
  plate: "#e7e7e5"
  plate-deep: "#dadad7"
  ink: "#161616"
  muted: "#4b4945"
  accent: "#e8490f"
  accent-ink: "#b8390a"
  cell-empty: "#d4d4d1"
  cell-base: "#7d7b75"
typography:
  display:
    fontFamily: "Imbue, 'Times New Roman', serif"
    fontSize: "clamp(4rem, 9.4vw, 10.5rem)"
    fontWeight: 500
    lineHeight: 0.86
    letterSpacing: "0.006em"
    fontVariation: "'opsz' 100"
  display-compact:
    fontFamily: "Imbue, 'Times New Roman', serif"
    fontSize: "clamp(3.5rem, 17vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.86
    letterSpacing: "0.006em"
    fontVariation: "'opsz' 100"
  headline:
    fontFamily: "Imbue, 'Times New Roman', serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3.4vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "0.006em"
    fontVariation: "'opsz' 100"
  figure:
    fontFamily: "'Albert Sans', system-ui, sans-serif"
    fontSize: "clamp(3rem, 4.6vw, 5rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.045em"
    fontFeature: "lining-nums tabular-nums"
  title:
    fontFamily: "'Albert Sans', system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem)"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Albert Sans', system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Albert Sans', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  none: "0"
spacing:
  cell-gap: "4px"
  margin: "clamp(20px, 4vw, 64px)"
  section: "clamp(120px, 14vw, 200px)"
components:
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "48px"
  button-accent-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-plate:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "48px"
  button-plate-hover:
    backgroundColor: "{colors.plate-deep}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "48px"
  button-ink-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  nav-action:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "9px 16px"
  nav-action-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
  exhibit-plate:
    backgroundColor: "{colors.plate}"
    rounded: "{rounded.none}"
    padding: "72px clamp(32px, 4.5vw, 80px)"
    height: "100svh"
  exhibit-inline:
    backgroundColor: "{colors.plate}"
    rounded: "{rounded.none}"
    padding: "44px 22px 28px"
  cell:
    backgroundColor: "{colors.cell-empty}"
    rounded: "{rounded.none}"
  contact-field:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    padding: "clamp(96px, 12vw, 180px) clamp(20px, 4vw, 64px)"
---

# Design System: Hitesh Saai

## Overview

**Creative North Star: "The Figure Book"**

The page reads like a technical book where every claim faces its figure. A reading column on the left carries the sentences; a sticky, full-height exhibit plate on the right shows the evidence for whatever is being read or pointed at, and crossfades to the next exhibit as the reader moves on. Exhibits are either drawn, in a single 20-column grid of square cells, or printed: real figures from the owner's arXiv paper and US patent, multiply-blended onto the plate so they read as ink on paper rather than pasted screenshots.

The surface is quiet and flat. Neutral paper, a slightly cooler grey plate, black ink, and one brand orange that only appears where something is acted on, marked as data, or where the page ends on the contact field. Imbue's condensed high-contrast serif capitals are the display voice for words (the name, the section heads, the closing line). Every number that carries a claim is set in Albert Sans 700 with tight tracking, solid rather than hairline. Albert Sans also carries everything that is read. Corners are square, there are no hairline rules, no monospace, no gradients and no shadows. Depth comes from the paper/plate tone step alone.

Motion belongs to the figures: drawings start empty and draw themselves cell by cell when shown, the plate crossfades between exhibits, and sections rise in once. Everything has a reduced-motion fallback (GSAP `matchMedia`), which shows every element in its final state. The cursor in the H+cursor mark blinks, and so does the cursor after the hero name.

**The living field (v2).** The hero and the contact field are drawn in the same square cells as the exhibits, on a canvas (`src/field.js`). Orange pixels step diagonally one cell at a time, using the four frame shifts from the pixel-shift paper, and leave a short fading trail. The pointer warms the cells under it. The hero is the one ink surface on the page. A single radial ink wash behind the name keeps the text readable and is the only gradient allowed. Scroll choreography runs on GSAP ScrollTrigger and Lenis: the hero name rises letter by letter, masked section heads rise out of their baseline, a proof bento (4 columns, `grid-auto-flow: dense`, 4px gaps) counts up and draws its cells, the toolkit runs as two marquee rows that speed up and lean with scroll speed, the About heading fills in word by word as you scroll, a rail fills along the experience ledger, and printed figures scale up as they enter and dim once read.

**Key Characteristics:**
- Split stage: reading column plus sticky exhibit plate; exhibits go inline below 960px.
- One cell grid (20 columns, 4px gaps, square cells) for every drawn figure.
- Printed source figures, multiply-blended on the plate, with provenance kept beside each raster.
- One accent, rationed to action, marked data, and the contact field.
- Square, flat, rule-free; tonal steps instead of lines or shadows.

## Colors

A near-achromatic paper-and-ink palette with one hot orange that marks only what matters.

### Primary
- **Signal Orange** (accent): The "Email me" button, the nav Contact hover, marked cells in drawings (the proven number, the kept pixels, the tuned knob), the claim and highlight markers on hover, text selection, the caret, and the full-bleed contact field at the end. Text on it is always ink, never paper, at rest.
- **Burnt Orange Ink** (accent-ink): The accent when it has to be text on paper (link arrows on hover, footer link hover), because Signal Orange on paper is too faint for text.

### Neutral
- **Paper** (paper): Page ground, nav fill once scrolled, inverted button hover on the contact field.
- **Plate Grey** (plate): The exhibit plate, inline exhibit panels, the paper-figure mount, and the default (quiet) button. The backdrop that printed figures multiply onto.
- **Deep Plate** (plate-deep): Hover state of plate-grey buttons only.
- **Ink** (ink): All primary text, the ink button, the nav Contact block, default highlight markers, focus outline.
- **Graphite** (muted): Secondary text: role status, dates, stack lines, captions, nav links at rest, dimmed sibling projects.
- **Empty Cell** (cell-empty): Unfilled cells in drawings, claim markers at rest, quiet underline colour on paper links.
- **Filled Cell** (cell-base): Filled data cells and the patent "default" ghost; scrollbar thumb.

### Named Rules
**The Marked Data Rule.** Orange appears only on the primary action, marked data in a figure, and the contact field. If a cell or element is orange, it is the thing the figure is proving or the thing to click.

**The Ink-on-Orange Rule.** Text sitting on Signal Orange is ink (4.65:1). Paper text on orange is reserved for transient hover states at lead size and weight.

## Typography

**Display Font:** Imbue (with 'Times New Roman', serif), weight 500, optical size pinned at 100, loaded at wght 400 to 600
**Body Font:** Albert Sans (with system-ui, sans-serif), weights 400, 500, 600

**Character:** A condensed, high-contrast serif in capitals for the few things that should feel printed and monumental, against a plain, even grotesque for everything a recruiter actually reads. Imbue is set at 500 because at 400 its hairlines vanish on the grey plate.

### Hierarchy
Five rendered sizes, no more: 14 / 19 / 26 / 72 / 135px at desktop width.
- **Display** (Imbue 500, clamp(4rem, 9.4vw, 10.5rem), 0.86, uppercase, caps tracking 0.006em): The closing line on the contact field (0.88). The hero name uses the same face at 600 and clamp(4.5rem, 18vw, 17rem), because on ink and over the moving cells the hairlines at 500 shimmer.
- **Figure** (Albert Sans 700, -0.045em, lining tabular numerals, 0.9): Every claim number: the proof cards (clamp(3rem, 4.6vw, 5rem); the large card clamp(4.5rem, 9vw, 9.5rem)) and the exhibit numerals on the plate (clamp(4rem, 7.5vw, 8.5rem)). Tabular figures keep the count-up from jittering.
- **Display Compact** (Imbue 500, clamp(3.5rem, 17vw, 6rem), 0.86): Display type in a phone-width column. Below 600px the hero name is 20vw, since the name and its cursor are about 4.1em wide.
- **Headline** (Imbue 500, clamp(2.5rem, 1.6rem + 3.4vw, 4.5rem), 0.9, uppercase, caps tracking 0.006em): Section heads (Experience, Research & patents, Selected work); also the worded exhibit numeral when the figure's claim is a phrase rather than a number (0.95).
- **Title** (Albert Sans 500, clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem), 1.2 to 1.38, -0.01em): The role line, the intro statement (balanced, max 32ch), the About statement (max 30ch), role, paper and project titles, the sign-off, and the email on the contact field (600).
- **Body** (Albert Sans 400, clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem), 1.6, max 60ch): All paragraphs and highlights; claim leads at 500.
- **Label** (Albert Sans 500/600, 0.875rem, sentence case): Nav, dates, stack lines, captions (max 52ch), cell-row labels with tabular figures, footer.

Text is set with normal kerning and no synthesised bold or italic. Paragraphs wrap with `pretty`, headings and the intro statement with `balance`.

### Named Rules
**The Words-and-Figures Rule.** Imbue capitals are the display voice for words: the name, section heads and closing line. The toolkit marquee is Albert Sans (700 on the first row, 500 in graphite on the second) so tool names keep their casing. Numbers that carry a claim are never set in Imbue; they use the Figure style (Albert Sans 700). Everything read is Albert Sans, never larger than the title step.

**The Five Sizes Rule.** Type uses only the five steps (small, body, lead, head, display, plus the compact display for phone-width columns). No one-off sizes.

**The Tabular Facts Rule.** Dates, years, venues and figure values use tabular numerals so ledgers and figure labels align.

## Layout

The stage is a two-column grid (1fr 1fr). The left column is the reading column with page margins of clamp(20px, 4vw, 64px), sections capped at 620px wide and separated by clamp(120px, 14vw, 200px). The right column is the exhibit plate: sticky at top 0, 100svh tall, holding every exhibit stacked absolutely and showing one at a time. The fixed nav spans the reading half only, so it never sits over the plate.

Whichever element with an exhibit crosses the middle of the viewport owns the plate; hovering or focusing a claim borrows the plate for its own exhibit and returns on leave. A claim without a figure clears the plate rather than borrowing another's evidence.

The hero is a full-viewport column: name, role and status, statement, actions, then the proof claims as a tight list. The contact field is full-bleed orange below the stage; the footer is a three-part single line.

Below 960px the plate is removed, the stage becomes one column, and each exhibit renders inline as a plate-grey panel inside its section. Below 600px the nav keeps only the Contact action and the toolkit list goes to one column.

### Named Rules
**The One Grid Rule.** Every drawn figure uses the same 20-column cell grid with 4px gaps and square cells, so exhibits compare at a glance.

## Elevation & Depth

Flat. There are no shadows anywhere. Depth is one tonal step: paper ground versus the plate-grey exhibit surface. Printed figures sit in that step using multiply blending, so their white drops out and their ink lands on the plate.

### Named Rules
**The Tone-Not-Shadow Rule.** To set something apart, place it on the plate. Never lift it with a shadow, gradient or outline.

## Shapes

Every corner is square: buttons, plates, inline panels, cells, the skip link. List markers are small solid blocks (10 by 7px), the same material as the cells, grey or ink at rest and orange when their item is pointed at. The brand mark is built from rectangles: two stems and a cursor block for the crossbar. There are no hairline borders or dividers; separation comes from space and tone. Underlines exist only on links, as 2px text decoration.

## Components

### Buttons
Square, flat, one shape, three fills.
- **Shape:** Square corners (0), min height 48px, 22px side padding, body size at weight 500.
- **Accent:** Signal Orange with ink text. The single primary action ("Email me"). Hover flips to ink with paper text.
- **Plate (default):** Plate grey with ink text, the base button style, for secondary actions ("See experience"). Hover deepens to plate-deep.
- **Ink:** Ink with paper text, used on the orange contact field. Hover inverts to paper with ink text.
- **Press:** All buttons scale to 0.98 on active. Focus is a 2px ink outline offset 3px.

### Navigation
Fixed over the reading half, transparent until scrolled, then paper. Brand (mark plus name, 600) on the left; section links in label size, graphite at rest and ink on hover; Contact as a small ink block that turns orange with ink text on hover.

### Claims and highlights
Proof claims in the hero are links: a bold lead plus a graphite remainder, with a cell-shaped marker that turns orange on hover or focus and swaps the plate to that claim's exhibit. Experience highlights use the same marker in ink, turning orange when the role is pointed at.

### Links
In-text links carry a 2px underline offset 5 to 6px, in empty-cell grey (or transparent on titles) at rest and orange on hover. Links that leave the site end in one drawn diagonal arrow that nudges up-right and turns burnt orange on hover. Pointing at one project dims its siblings to graphite.

### Exhibit (signature)
A figure on plate grey: optional big Figure numeral (Albert Sans 700) with a graphite note, a drawing in the cell grid or a printed source figure, and a graphite caption (max 52ch). On the plate it is centred with 72px vertical padding and crossfades in over 0.9s. Inline, it is a plate panel with 44px 22px 28px padding and a smaller numeral.

### Cell drawings (signature)
Bars, grids and tracks built from square cells: empty cells in cell-empty, data in cell-base, the proven share in Signal Orange. When shown, filled cells draw in one by one along each row; patent tracks slide the orange knob from the grey default to the tuned value. Printed figures carry provenance sidecars and are never decorative.

### Contact field
Full-bleed Signal Orange, ink text: the closing line in Imbue capitals, a short status statement, the email address in title size with a 2px underline, and ink buttons for external profiles.

## Do's and Don'ts

### Do:
- **Do** give every claim an exhibit: a cell drawing or a printed source figure with provenance. If none exists, clear the plate.
- **Do** draw figures in the shared 20-column cell grid (4px gaps, square cells) and print source figures with multiply blending on plate grey.
- **Do** keep Signal Orange to the primary action, marked data and the contact field; use Burnt Orange Ink when the accent must be text on paper.
- **Do** keep Imbue capitals to the name, section heads and closing line; set claim numbers in Albert Sans 700 and everything read in Albert Sans.
- **Do** separate with space and the paper/plate tone step.
- **Do** give every animation a reduced-motion fallback: drawings show complete, the plate swaps without fading, the mark stops blinking.

### Don't:
- **Don't** round corners anywhere.
- **Don't** use hairline borders or divider rules, shadows, or gradients.
- **Don't** use monospace type, or type sizes outside the five steps.
- **Don't** make anything blink except the cursor in the H+cursor mark.
- **Don't** put paper-coloured text on Signal Orange at rest, or Signal Orange text on paper.
- **Don't** invent figures or decorate with imagery that is not evidence from the owner's own work.
