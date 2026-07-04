# React Brand Showcase (GSAP ScrollTrigger + Lenis)

A highly interactive, performance-optimized, and premium product showcase built with React, GSAP (GreenSock Animation Platform), and Lenis. The page transitions seamlessly through scroll-triggered product highlights, ending with a cinematic multi-product showcase and a glassmorphic footer.

![Glistening Droplets Showcase](file:///C:/Users/kunal/.gemini/antigravity-ide/brain/4127e3cf-b4f0-4fa6-9dd2-627f5e4f441e/glistening_water_droplets_ambient_1783089411924.png)

---

## ✨ Key Features

### 1. Split Hero Landing Page (40% / 60% Layout)
- **Left Column (40%)**: Features the primary **Coca-Cola Can** positioned centered-left at full scale on initial load.
- **Right Column (60%)**: A clean, typographic layout including the **Classic Refreshment** header, a descriptive paragraph, three glassmorphic capsule feature tags (**Original Taste**, **Zero Calories**, **Premium Quality**) with custom glowing indicator dots, and an animated pulsing arrow indicating to scroll.

### 2. Snappy Card Selector Docking
- As the user scrolls, the initial text dissolves and a **Product Cards selector** container animates into view.
- The Coca-Cola can translates from its offset hero position and docks **perfectly centered** into its designated card slot.
- Parallel cards slide up in vertical columns, with Pepsi, Sprite, and Fanta cans fading in cleanly with zero overlap or stutters.

### 3. Dedicated Brand Showcase Stages
The user scrolls through detailed feature specifications for each carbonated beverage. Cans transition snappy and snap to center-stage with distinct, brand-matched colors:
- **Stage 1: Coca-Cola** (Sweet Caramel / Vanilla Blend / Cinnamon) — Deep Crimson gradient background.
- **Stage 2: Pepsi** (Citrus Splash / Caramel / Sparkling Kola) — Classic Royal Blue gradient background.
- **Stage 3: Sprite** (Fresh Lime / Zesty Lemon / Caffeine-Free) — Energizing Green gradient background.
- **Stage 4: Fanta** (Sweet Orange Pulp / Tangerine / Tangy Fizz) — Vibrant Orange gradient background.

### 4. Cinematic Showcase & Interactive Glassmorphic Footer
- **Stage 5: Burst Showcase**: Fanta transitions via a clean background crossfade directly into a dark studio setup (`#050203`). All 4 cans **burst outward from the bottom-center** with a springy ease (`back.out`) into a floating, symmetrical arc.
- **Showcase Title**: The final heading **Choose Your Refreshment** slides up cleanly and centers itself right underneath the cans.
- **Slide-up Footer**: A premium, glass-morphic footer slides up from the bottom of the screen. Features branding, corporate copyright lines, and active link directories (*Brands*, *Explore*, *Connect*).
- **Lowered Backdrop Blur**: Custom styled with `backdrop-filter: blur(4px) saturate(120%)` to ensure that links and copy remain highly sharp, legible, and clear.

### 5. Butter-Smooth Inertial Scroll (Lenis Integration)
- Integrated the industry-standard **Lenis smooth scrolling library** to eliminate browser scroll stutters.
- Synced scroll events with **GSAP ScrollTrigger**:
  - Automatically updates scroll positions via `ScrollTrigger.update`.
  - Driven by the GSAP Ticker animation loop (`gsap.ticker.add`) for frame-by-frame synchronization.

### 6. Glistening 3D Ambient Water Droplets
- Replaced flat background particle streaks with circular, glistening, three-dimensional water drops:
  - Specular highlights (`inset 0 3px 6px`) and refractive contour shadows.
  - Slower, floating liquid physics (gradual vertical drift combined with horizontal swaying).
  - Depth-of-field blur filters corresponding to droplet diameter (foreground vs. background drops).
  - **Pre-distributed on Load**: Immediately scattered across the viewport using GSAP random delays, preventing empty screens on load.
  - **Mouse-move Parallax**: Moving the cursor sways the background droplets and foreground particles in opposite directions for visual depth.

---

## 🛠️ Technology Stack

- **Framework**: React (Vite-powered SPA template)
- **Animation Platform**: GSAP (GreenSock Animation Platform)
- **Scroll Plugins**: GSAP ScrollTrigger
- **Smoothing Engine**: Lenis (Studio Freight)
- **Styling**: Modern CSS3 (CSS Custom Variables, Glassmorphism, Flexbox/Grid, Backdrop-filters)

---

## 🚀 Installation & Setup

### 1. Clone & Install Dependencies
Navigate to your project root folder and install packages:
```bash
npm install
```

### 2. Run the Development Server
Launch Vite's local dev server:
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Production Build
Compile optimized production assets:
```bash
npm run build
```
Vite compiles minified, cache-busting assets into the `dist/` directory.

### 4. Preview Build Locally
Preview the production build locally:
```bash
npm run preview
```

---

## 📁 Project Structure

```
├── dist/                      # Compiled production assets
├── src/
│   ├── assets/                # Can images and static textures
│   │   ├── coke_can_realistic.png
│   │   ├── pepsi_can.png
│   │   ├── sprite_can.png
│   │   └── fanta_can.png
│   ├── components/            # ScrollHero Component files
│   │   ├── ScrollHero.jsx     # Master component logic and GSAP timeline
│   │   └── ScrollHero.css     # CSS Variables, grid structures, and animations
│   ├── App.jsx                # Render container
│   └── main.jsx               # React DOM entry point
├── vite.config.js             # Vite compiler config (base: './' relative output)
├── package.json               # Dependencies (GSAP, Lenis, React)
└── README.md                  # Comprehensive document resource
```

---

## ⚙️ How It Works (Scroll Choreography)

The scroll interaction is managed by a single, pinned **GSAP master timeline** linked to a **ScrollTrigger**:
- The component is pinned for a scroll length equal to `6 screens` (`window.innerHeight * 6`).
- **Scrubbing Delay**: Set to `1.2s` (`scrub: 1.2`), cushioning the scroll transition so animations catch up smoothly as the user scrolls.

### Timeline Stages:
| Scroll Range (Progress) | Time Marker | Active Stage | Description |
|---|---|---|---|
| `0.00 -> 0.16` | `0.0` | **Stage 0** | Coke slides left; cards fade in; Coke docks centered. |
| `0.16 -> 0.32` | `1.0` | **Stage 1** | Coke shifts center-stage; red background fades in; details panel enters. |
| `0.32 -> 0.48` | `2.0` | **Stage 2** | Pepsi slides in; blue background fades in; Pepsi details panel enters. |
| `0.48 -> 0.64` | `3.0` | **Stage 3** | Sprite slides in; green background fades in; Sprite details panel enters. |
| `0.64 -> 0.80` | `4.0` | **Stage 4** | Fanta slides in; orange background fades in; Fanta details panel enters. |
| `0.80 -> 1.00` | `5.0 -> 6.6` | **Stage 5** | Showcase cans burst outward in arc; footer slides in from bottom; cans & text shift up. |

---

## 🎨 Customization Guide

### Swapping Can Textures:
1. Save your transparent PNG can assets in `src/assets/`.
2. Import the images at the top of [ScrollHero.jsx](file:///c:/Users/kunal/IdeaProjects/Basic.java/.idea/Reactapps/react-hero/src/components/ScrollHero.jsx).
3. The CSS properties dynamically scale and center elements. Ensure your images maintain a matching vertical aspect ratio for uniform rendering.

### Adjusting Animation Timing:
- Edit the master timeline coordinates inside [ScrollHero.jsx](file:///c:/Users/kunal/IdeaProjects/Basic.java/.idea/Reactapps/react-hero/src/components/ScrollHero.jsx).
- Modifying timeline duration or scrub values will alter scroll snapping responsiveness and velocity constraints.
- Customize backdrop colors, spotlight radial gradients, and typography dimensions via variables located at the top of [ScrollHero.css](file:///c:/Users/kunal/IdeaProjects/Basic.java/.idea/Reactapps/react-hero/src/components/ScrollHero.css).
