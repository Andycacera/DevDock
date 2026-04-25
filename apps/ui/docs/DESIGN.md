---
name: Technical Noir
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#bec6e0'
  on-secondary: '#283044'
  secondary-container: '#3f465c'
  on-secondary-container: '#adb4ce'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  display:
    fontFamily: Nunito
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Nunito
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h2:
    fontFamily: Nunito
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Nunito
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Nunito
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  mono-code:
    fontFamily: monospace
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Nunito
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 16px
  margin: 32px
---

## Brand & Style

The design system is a high-performance, technical aesthetic engineered for deep-focus environments. It targets developers, data scientists, and power users who prioritize information density and clarity over decorative elements.

The style combines **Minimalism** with **Modern Brutalism**. It utilizes a strict dark-mode-first approach, where structural integrity is defined by high-contrast outlines and a singular vibrant accent. The emotional response is one of precision, authority, and futuristic reliability. Visuals are intentionally raw—relying on grid lines, monospace characters, and data-heavy layouts to communicate a "machine-interface" sophistication.

## Colors

The palette is anchored in absolute blacks and deep charcoals to reduce eye strain and maximize the impact of the primary accent. 

- **Primary Blue (#3B82F6):** A high-vibrancy electric blue used sparingly for interactive elements, status indicators, and critical highlights.
- **Surface Architecture:** The background is an absolute black (#000000), while UI containers use a subtle elevation shift to #0A0A0A.
- **Borders:** Structural integrity is maintained via low-opacity neutral borders (#262626) rather than shadows.
- **Status Colors:** Use the primary blue for "Info" and "Process," while maintaining strict red/amber/green only for system errors or successes.

## Typography

This design system uses **Nunito** across all primary hierarchies to keep the interface friendly, approachable, and highly legible in dense dashboards. Its soft, rounded character reduces visual tension while still feeling polished and modern.

- **Monospace Integration:** Use system monospace fonts for all numerical data, IDs, and code blocks to ensure character alignment and a "terminal" aesthetic.
- **Micro-Copy:** Labels and metadata should use `label-sm` with increased letter spacing and uppercase styling to differentiate them from interactive body text.
- **Line Heights:** Generous line heights are applied to body text to prevent "wall-of-text" fatigue in dark mode.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model within a 12-column system for dashboard views, transitioning to a highly structured modular layout for tools.

- **Rhythm:** A 4px baseline grid governs all spacing. All paddings and margins must be multiples of 4.
- **Density:** Information density is high. Use `md` (16px) for standard component spacing and `sm` (8px) for related data points.
- **Structural Lines:** Use vertical and horizontal rules (1px, #262626) to define sections rather than relying solely on whitespace, reinforcing the blueprint-like aesthetic.

## Elevation & Depth

Depth in this design system is achieved through **Tonal Layering** and **High-Contrast Outlines** rather than physical shadows.

- **Surface Tiers:** 
  - Level 0: Background (#000000)
  - Level 1: Cards/Panels (#0A0A0A)
  - Level 2: Overlays/Modals (#111111)
- **Borders:** Every container must have a 1px solid border. Active states or primary focus areas swap the neutral border for the primary blue (#3B82F6).
- **Backdrop:** Modals use a 60% opacity black overlay with a 4px blur to maintain focus without introducing skeuomorphic light sources.

## Shapes

The design system uses **lightly rounded corners** for all primary UI elements to feel more approachable and less rigid.

- **Soft Edges:** Buttons, input fields, cards, and tabs should use subtle rounding rather than sharp corners.
- **Exceptions:** Icons and certain status pips may use circular forms to stand out against the rigid grid, but all structural containers remain rectangular.

## Components

- **Buttons:** Primary buttons are solid Blue (#3B82F6) with Black text. Secondary buttons are transparent with a 1px neutral border and White text. Use lightly rounded corners to make actions feel friendlier; hover states still trigger a slight brightness increase.
- **Input Fields:** Softly rounded boxes with 1px borders. Focused inputs use a 1px Blue border and a subtle "glow" (a 2px solid blue stroke inside the border).
- **Chips/Tags:** Nunito-based labels, 12px, with a 1px border. Status-specific tags use the primary blue for active/live states.
- **Cards:** No shadows. Cards are defined by a background shift to #0A0A0A and a 1px border, with gentle corner rounding to soften the container shape. 
- **Data Tables:** High-density, no vertical borders, only horizontal dividers. Headers are uppercase `label-sm`.
- **Navigation:** Vertical sidebar navigation with "active indicator" lines (2px vertical blue line) on the far left of the active item.
