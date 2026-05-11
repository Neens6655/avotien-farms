# Design Specification — Avotien

## Brand Identity

Avotien is warm, trustworthy, and premium. It sells the dream of owning something real — trees that grow, produce, and generate wealth. The design must feel like a high-end impact investment platform, not a crypto pump.

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--av-forest` | `#1B4332` | Primary — nav, headings, CTAs |
| `--av-forest-light` | `#2D6A4F` | Hover states, secondary elements |
| `--av-cream` | `#FFF8F0` | Background — main surfaces |
| `--av-cream-dark` | `#F5EDE0` | Alt background — alternating sections |
| `--av-terra` | `#C65D3E` | Accent — highlights, badges, alerts |
| `--av-terra-light` | `#E87B5A` | Hover accent |
| `--av-gold` | `#D4A84B` | Decoration only — borders, icons, NOT text |
| `--av-charcoal` | `#1A1A1A` | Body text |
| `--av-gray` | `#6B7280` | Secondary text, captions |
| `--av-white` | `#FFFFFF` | Cards, modals |

**RULE: Gold (#D4A84B) is NEVER used as text color on light backgrounds (2.2:1 contrast — fails WCAG AA). Use only for borders, icons, decorative accents.**

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display | Playfair Display | 700 | 48-72px (fluid) |
| Heading | Playfair Display | 600 | 32-40px |
| Subheading | Inter | 600 | 20-24px |
| Body | Inter | 400 | 16-18px |
| Label | Inter | 500 | 14px, uppercase, tracking 0.05em |
| Data/Number | Inter | 700 | varies |
| Caption | Inter | 400 | 12-14px |

## Spacing

- Section padding: `py-20 md:py-28`
- Content max-width: `max-w-7xl mx-auto px-6`
- Card gap: `gap-6 md:gap-8`
- Component internal padding: `p-6 md:p-8`

## Border & Radius

- Cards: `rounded-2xl` (16px)
- Buttons: `rounded-full` (9999px)
- Inputs: `rounded-lg` (8px)
- Images: `rounded-xl` (12px)
- No sharp corners except decorative dividers

**Note: This is NOT Bauhaus — Avotien uses soft, warm radii to feel approachable and premium.**

## Shadows

- Card: `shadow-sm` default, `shadow-md` on hover
- CTA buttons: `shadow-lg shadow-forest/20`
- No hard offset shadows (that's Bauhaus territory)

## Components

### Navbar
- Sticky, white bg with blur backdrop
- Logo left, links center, CTA right
- Mobile: hamburger → slide-in drawer
- Height: 72px desktop, 64px mobile

### Hero
- Full viewport height, parallax background image
- Dark overlay (50% opacity) for text contrast
- H1 in Playfair Display, white, centered
- 2 CTAs: "Start Investing" (forest bg, white text) + "Calculate Returns" (outline, white)
- Trust bar below: media logos in grayscale, "X trees planted" counter

### Investment Cards
- White card, rounded-2xl, shadow-sm
- Header: plan name (forest) + price (terra accent)
- Feature list with check icons (forest green)
- CTA button full-width at bottom
- Hover: lift with shadow-md transition

### ROI Calculator
- Cream-dark background section
- Sliders with forest-green track, terra thumb
- Results in 4 metric cards (white, shadow-sm)
- Animated number counters on value change

### FAQ Accordion
- Clean expand/collapse with Framer Motion
- Category pills for filtering
- Plus/minus icon, forest green

### Footer
- Forest green background, cream text
- 4 columns: Company, Invest, Legal, Connect
- Newsletter signup: cream input, terra CTA button
- Social icons row

## Motion

- **Scroll animations**: Fade-up with 0.6s duration, stagger children by 0.1s
- **Parallax**: Hero image at 0.5x scroll speed via Lenis
- **Hover**: Cards lift 4px, buttons scale 1.02
- **Page transitions**: Fade 0.3s
- **prefers-reduced-motion**: All animations disabled, static layout

## Responsive Breakpoints

| Breakpoint | Width | Notes |
|-----------|-------|-------|
| Mobile | <640px | Single column, stacked cards, bottom sticky CTA |
| Tablet | 640-1024px | 2-col grid, reduced padding |
| Desktop | >1024px | Full layout, 3-col grids, side-by-side sections |

## Image Strategy

- Hero: high-quality Uganda landscape / avocado farm (stock for v1)
- Team: placeholder avatar circles (generate or use UI faces)
- Projects: aerial farm view, close-up avocados, planting photos
- All images: next/image with lazy loading, WebP format
- Placeholder: blur hash for loading states
