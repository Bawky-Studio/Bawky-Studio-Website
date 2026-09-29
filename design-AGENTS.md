# AGENTS.md — Indie Game Studio Website Redesign

---

## 0. Website Theme

This project is an **indie game studio showcase and promotion website**.

The website serves as the official hub to:
- Introduce and promote games developed by the studio
- Present the studio’s identity, vision, and team
- Share announcements, events, and external media channels (YouTube, blog)

The website functions as a **brand showcase**, not as a gameplay platform or service product.

---

## 1. Project Summary & Goals

### Summary
Redesign the existing website to improve visual consistency, clarify brand tone, and deliver a polished and professional presentation of the studio and its works.

The redesign focuses on **design quality, usability, and maintainability**, while preserving the existing routing and project structure.

### Goals
- Unify and improve the overall visual design
- Establish a clear and consistent brand tone
- Improve information hierarchy and readability
- Provide a high-quality experience on desktop and mobile
- Meet Lighthouse quality standards (Performance, Accessibility, SEO)

---

## 2. Scope & Definition of Done

### In Scope
- Redesign all existing pages
- Update global layout and navigation
- Apply a unified design system across the site
- Improve mobile responsiveness and accessibility

### Out of Scope
- Backend or API logic changes (unless strictly required for UI rendering)

### Definition of Done
The redesign is complete when:
- All pages reflect the new design system
- The site is fully responsive on desktop and mobile
- Lighthouse quality targets are met
- No functional or visual regressions exist

---

## 3. Current State (As-is)

### Tech Stack
- Framework: Next.js
- Internationalization: next-intl
- Design : Tailwind-css

### Current Issues
- Inconsistent visual design across pages
- Lack of unified spacing, typography, and component rules
- Brand tone not clearly expressed through UI
- Page layouts vary without clear design principles

### Constraints
- Existing routing structure must be preserved
- Existing next-intl message keys must not be renamed or removed
- Project setup and tooling remain unchanged

---

## 4. Design Direction & Design System

### 4.1 Design Philosophy
The website is a **showcase space** for the studio and its creations.

UI elements must remain visually restrained so that games, media, and written content take precedence.

Core principle:
> The website must not compete with the games for attention.

---

### 4.2 Tone & Mood
- Minimal and restrained
- Cinematic and immersive
- Calm, confident, and deliberate
- Structured rather than playful
- Modern

Experience flow:
1. Strong first impression (hero section)
2. Calm and readable information flow
3. Clear but subtle calls to action

Avoid:
- Cute or playful UI elements
- Decorative graphics without purpose
- Aggressive colors or excessive animation

---

### 4.3 Color System
- Neutral base colors dominate the UI
- A single accent color is used sparingly

**Neutral colors** are used for:
- Backgrounds
- Primary text
- Dividers and borders
- Most UI components

**Accent color** usage:
- Primary CTAs
- Highlighted text
- Active or selected states

Rules:
- Do not use multiple accent colors on one page
- Accent color usage must be minimal and intentional

---

### 4.4 Typography
Typography is a primary carrier of brand identity.

- Sans-serif typefaces
- Clear weight contrast between headings and body text
- Generous line-height and spacing

Hierarchy:
- H1: One per page, expressive if needed
- H2: Section titles, short and concise
- Body text: 1–2 sentences per section

Avoid long explanatory paragraphs.

---

### 4.5 Layout & Spacing
Whitespace is a deliberate design element.

- Large spacing between sections
- Consistent vertical rhythm across pages
- Full-width hero sections for major pages

Rules:
- Section spacing must be larger than internal component spacing
- Mobile layouts must preserve hierarchy and spacing
- Do not compress content excessively on small screens

---

### 4.6 Components

**Buttons**
- Default: text-based or minimally outlined
- Solid buttons reserved for primary CTAs only
- Subtle hover effects (opacity or underline movement)

**Cards / Containers**
- Avoid heavy card-style UI
- Minimal or no shadows
- Borders, if used, must be subtle

**Media**
- Prefer fewer, larger images
- Videos must not autoplay
- Media should support the narrative of each section

---

### 4.7 Motion & Animation
Motion is supportive, not decorative.

- Use sparingly
- Preferred patterns:
  - Opacity transitions
  - Small vertical translations
- Slow, smooth easing
- Avoid looping or distracting animations

---

## 5. IA & Page Structure

### Routes
- `/`  
  Main landing page  
  (Hero, game introduction, announcements, YouTube/blog links)

- `/Games`  
  Games developed by the studio

- `/Programs`  
  Programs or tools developed by the studio

- `/Event`  
  Events hosted or participated in by the studio

- `/About`  
  Studio overview and team introduction

### Navigation
- Desktop: Top navigation bar
- Mobile: Hamburger menu with drawer navigation  
  - Must support keyboard navigation and proper focus management

---

## 6. Workflow

### Setup
- Install dependencies:
  - `pnpm i`

### Development
- Run development server:
  - `pnpm dev`

All redesign work must be verified locally before completion.

---

## 7. Work Plan

### Phase 0 — Preparation
- Audit existing pages and reusable components
- Finalize design system tokens
- Record baseline Lighthouse scores
- Review next-intl message namespaces

---

### Phase 1 — Global Layout & Navigation
- Implement unified global layout
- Redesign desktop navigation
- Implement mobile drawer navigation
- Ensure keyboard and focus behavior

---

### Phase 2 — Page Implementation
Implementation order:
1. `/`
2. `/About`
3. `/Games`
4. `/Programs`
5. `/Event`

Guidelines:
- Implement pages section by section
- Reuse shared components
- Maintain correct heading hierarchy
- Ensure full i18n coverage

---

### Phase 3 — Responsive & Accessibility QA
- Validate layouts at:
  - 375 / 768 / 1024 / 1440 px
- Verify keyboard navigation
- Ensure visible focus indicators
- Validate semantic HTML structure

---

### Phase 4 — Performance & SEO
- Optimize images and media loading
- Meet Lighthouse target scores
- Add or refine metadata and Open Graph tags
- Verify internal linking and crawlability

---

### Phase 5 — Final Review & Release
- Run full build
- Verify no errors or warnings
- Record final Lighthouse scores
- Prepare for deployment

---

## 8. Codex Agent Rules

### Core Rules
- Preserve existing routing and behavior
- Do not rename or remove existing next-intl keys
- Reuse existing components before creating new ones
- Follow the defined design system strictly
- Work in small, reviewable steps

---

### Task Execution
- One task per change set
- One clear goal per task
- Split page work into section-level tasks
- Avoid unnecessary abstraction

---

### Accessibility & UX
- Never remove focus indicators
- All interactive elements must be keyboard accessible
- Use semantic HTML elements consistently
