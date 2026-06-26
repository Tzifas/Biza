---
name: Empowered Learning
colors:
  surface: '#faf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#faf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f4f0'
  surface-container: '#efeeea'
  surface-container-high: '#e9e8e4'
  surface-container-highest: '#e3e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#424843'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ed'
  outline: '#727973'
  outline-variant: '#c1c8c2'
  surface-tint: '#456553'
  primary: '#032416'
  on-primary: '#ffffff'
  primary-container: '#1a3a2a'
  on-primary-container: '#82a48f'
  inverse-primary: '#abcfb8'
  secondary: '#316947'
  on-secondary: '#ffffff'
  secondary-container: '#b1eec2'
  on-secondary-container: '#366e4b'
  tertiary: '#755b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#d0a61f'
  on-tertiary-container: '#4f3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c7ebd4'
  primary-fixed-dim: '#abcfb8'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#2d4d3c'
  secondary-fixed: '#b4f0c5'
  secondary-fixed-dim: '#99d4aa'
  on-secondary-fixed: '#00210f'
  on-secondary-fixed-variant: '#165131'
  tertiary-fixed: '#ffe08f'
  tertiary-fixed-dim: '#eec13c'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#584400'
  background: '#faf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e3e2df'
typography:
  headline-xl:
    fontFamily: DM Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: DM Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: DM Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: DM Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  margin-mobile: 16px
  margin-desktop: 40px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  max-width: 1200px
---

## Brand & Style

The design system is built for an online education platform that bridges the gap between ambition and practical achievement. The brand personality is grounded, authoritative, and deeply practical, avoiding the "get rich quick" hype often found in digital education. It reflects a Kenyan identity through a palette inspired by nature and agriculture, signaling growth and reliability.

The visual style is **Corporate Modern with a Flat-Refined twist**. It prioritizes high legibility and clear information hierarchy. By eschewing drop shadows in favor of hair-line borders and tonal shifts, the interface remains light, fast, and accessible on mobile devices. The aesthetic is "Premium-Lite"—sophisticated enough for professionals but approachable enough for students.

## Colors

The palette uses a sophisticated "Forest and Cream" foundation to establish trust.

- **Forest Green (#1A3A2A):** Used for primary navigation, headings, and high-impact UI elements. It represents the depth of knowledge.
- **Leaf Green (#2E6644):** Used for secondary actions, success states, and progress indicators.
- **Gold (#F5C842):** Reserved exclusively for calls-to-action (CTAs) and highlighting achievements/milestones. It provides a warm, optimistic contrast.
- **Cream (#F7F6F2):** The primary surface color, providing a softer reading experience than pure white, reducing eye strain during long study sessions.
- **Ink (#1A1A1A):** A near-black for maximum contrast on body text and labels.
- **Border (#E8E6DE):** A precise, low-contrast neutral for structural containment without visual clutter.

## Typography

This design system utilizes a dual-font strategy to balance character with utility.

**DM Sans** is used for all headlines. Its geometric yet friendly terminals provide a modern, professional look that feels authoritative in the Kenyan market. Headlines should use tight tracking and slightly reduced line heights for impact.

**Inter** is the workhorse for all body text, inputs, and micro-copy. It is chosen for its exceptional legibility on small mobile screens and its neutral, systematic feel. 

For mobile optimization, top-level headings (XL and LG) scale down slightly to ensure headers don't push content too far below the fold.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a mobile-first philosophy.

- **Mobile:** A single-column stack with 16px side margins. Elements rely on vertical rhythm (8px/16px/32px steps) to define relationships.
- **Tablet (768px+):** Transition to a 6-column grid with 16px gutters.
- **Desktop (1024px+):** A 12-column grid with a maximum container width of 1200px. Gutters remain 16px to maintain a compact, information-dense feel.

Spacing is strictly based on an 8px multiplier. Use `stack-sm` for related items (label + input), `stack-md` for internal component padding, and `stack-lg` for section breaks.

## Elevation & Depth

This design system rejects drop shadows to maintain a clean, "ink-on-paper" feel. Instead, depth is communicated through **Low-contrast outlines** and **Tonal Layering**.

- **Level 0 (Base):** The Cream (#F7F6F2) surface.
- **Level 1 (Cards/Containers):** White (#FFFFFF) backgrounds with a 0.5px border (#E8E6DE).
- **Level 2 (Modals/Overlays):** White backgrounds with a slightly thicker 1px border in Leaf Green (#2E6644) to draw focus.

Interactive states (hover/active) should use subtle background color shifts or border weight increases rather than shadow-based lift.

## Shapes

The shape language is "Approachable Geometric." 

- **Cards and Containers:** Use a 12px radius (`rounded-lg`). This is soft enough to feel modern but rigid enough to feel professional.
- **Buttons and Inputs:** Use a 25px radius (`pill-shaped`). The exaggerated roundness of buttons creates a distinct "touchable" target that stands out against the more angular card layouts.
- **Status Chips:** Use a full pill radius (999px) for a clear distinction from primary action buttons.

## Components

### Buttons
- **Primary:** Gold (#F5C842) background, Ink (#1A1A1A) text. 25px radius. Bold DM Sans.
- **Secondary:** Forest Green (#1A3A2A) background, Cream text. 25px radius.
- **Tertiary/Ghost:** No background, Forest Green text, 0.5px border (#E8E6DE).

### Input Fields
- White background, 25px radius, 0.5px border (#E8E6DE). 
- Label should be Inter Bold, 12px, positioned above the field.
- Focused state: Border changes to Leaf Green (#2E6644) with 1px thickness.

### Cards
- White background, 12px radius, 0.5px border.
- Internal padding: 24px (desktop), 16px (mobile).
- Used for Course modules, Blog previews, and Student testimonials.

### Progress Indicators
- Linear bars using Leaf Green (#2E6644) for the fill and a muted version of Cream for the track. No rounded ends on the inner bar to maintain a technical, "measured" look.

### Chips/Tags
- Small, pill-shaped labels for categories (e.g., "Business," "Freelancing"). Use Forest Green text on a very light Leaf Green tint background.