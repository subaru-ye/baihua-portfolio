# UI Effect Versions

## v1.0 - CSS Cursor Spotlight

- Lightweight cursor-following radial glow.
- Uses CSS variables and `radial-gradient()` layers.
- Best for low-cost polish on dark pages where WebGL is unnecessary.

## v2.0 - Hero WebGL Shader Background

- Raw WebGL shader effect scoped to the Hero section.
- Adds procedural smoke, cyan glow, mouse-following illumination, DPR caps, resize handling, and static fallback.
- Useful when the first viewport needs an Onlook-style interactive visual anchor.

## v2.1 - Sitewide WebGL Light Field

- Single fixed WebGL canvas shared by the full page.
- Keeps mouse illumination continuous across Hero, About, Projects, Contact, and Footer.
- Adds scroll-aware shader movement through `u_scroll`.
- Mobile, narrow viewport, reduced-motion, and WebGL failure paths keep a static cyan/blue fallback.
- Not yet written into the `cursor-spotlight-ui` skill; this version note is the staging record for future skill updates.

## v3.0 - Flowing Shader Atmosphere

- Keeps the single fixed WebGL canvas from v2.1.
- Adds stronger domain warping and curl-like flow fields so the background smoke visibly moves.
- Adds `u_mouse_velocity` to make mouse movement create a subtle wake and brighter disturbed flow.
- Preserves the cyan/blue palette and explicit cold `rgba()` surfaces to avoid Edge color-shift issues.
- Still uses a single-pass shader with no new dependencies; framebuffer-based fluid simulation is reserved for a later v3.1/v4.0 direction.
