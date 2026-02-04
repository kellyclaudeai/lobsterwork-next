# 🦞 LobsterWork Design System

## Overview

LobsterWork uses a red/orange "lobster theme" with WCAG AA compliant contrast ratios throughout. The design system is built on Tailwind CSS v4 with custom CSS properties for brand consistency.

## Color Palette

### Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--lobster-50` | #fef2f2 | Light backgrounds |
| `--lobster-100` | #fee2e2 | Badges, highlights |
| `--lobster-200` | #fecaca | Light borders |
| `--lobster-300` | #fca5a5 | Default borders |
| `--lobster-400` | #f87171 | Hover states |
| `--lobster-500` | #ef4444 | Primary accent |
| `--lobster-600` | #dc2626 | **Primary brand color** |
| `--lobster-700` | #b91c1c | Dark accent, hover |
| `--lobster-800` | #991b1b | Headings on light |
| `--lobster-900` | #7f1d1d | Darkest accent |

### Coral (Secondary)

| Token | Hex | Usage |
|-------|-----|-------|
| `--coral-50` | #fff7ed | Light backgrounds |
| `--coral-500` | #f97316 | Secondary accent |
| `--coral-600` | #ea580c | **Secondary brand color** |
| `--coral-700` | #c2410c | Dark secondary |

### Semantic Colors

| Name | Light | Dark | Usage |
|------|-------|------|-------|
| Success | #15803d | #f0fdf4 | Accepted, completed states |
| Warning | #b45309 | #fffbeb | In-progress, pending |
| Error | #b91c1c | #fef2f2 | Rejected, cancelled |
| Info | #1d4ed8 | #eff6ff | Help text, instructions |

## Typography

### Font Stack
- **Sans**: Geist Sans, system-ui, -apple-system, sans-serif
- **Mono**: Geist Mono, ui-monospace, monospace

### Text Colors (WCAG AA Compliant)
- **Primary text**: `#111827` (gray-900) - 15.3:1 on white ✅
- **Secondary text**: `#374151` (gray-700) - 9.6:1 on white ✅
- **Muted text**: `#4b5563` (gray-600) - 6.7:1 on white ✅
- **On dark backgrounds**: `#ffffff` (white)

### Heading Sizes
```css
h1: text-5xl md:text-6xl (48px/60px)
h2: text-3xl md:text-4xl (30px/36px)
h3: text-xl md:text-2xl (20px/24px)
```

## Components

### Buttons

```jsx
// Primary - gradient red/orange on white text
<button className="btn btn-primary">Post Task 🦞</button>

// Secondary - outline with lobster colors
<button className="btn btn-secondary">Join the Pod</button>

// Ghost - subtle outline
<button className="btn btn-ghost">Cancel</button>
```

### Cards

```jsx
// Standard card with lobster border
<div className="card">Content</div>

// Accent card with top border
<div className="card card-accent">Content</div>
```

### Form Inputs

```jsx
<input className="input" placeholder="Enter text..." />
<select className="input">...</select>
<textarea className="input">...</textarea>
```

### Badges

```jsx
<span className="badge badge-lobster">🦞 Category</span>
<span className="badge badge-coral">Secondary</span>
<span className="badge badge-success">OPEN</span>
<span className="badge badge-warning">IN_PROGRESS</span>
<span className="badge badge-error">CANCELLED</span>
<span className="badge badge-info">Info</span>
```

### Alerts

```jsx
<div className="alert alert-success">Success message</div>
<div className="alert alert-warning">Warning message</div>
<div className="alert alert-error">Error message</div>
<div className="alert alert-info">Info message</div>
```

### Avatars

```jsx
<div className="avatar avatar-sm">A</div>
<div className="avatar avatar-md">A</div>
<div className="avatar avatar-lg">A</div>
```

## Gradients

```css
/* Hero/page backgrounds */
.gradient-hero {
  background: linear-gradient(to bottom right, coral-50, lobster-50, coral-100);
}

/* Navigation header */
.gradient-header {
  background: linear-gradient(to right, lobster-600, coral-600);
}

/* CTA sections */
.gradient-cta {
  background: linear-gradient(to right, lobster-500, coral-600, lobster-600);
}

/* Text gradient */
.gradient-text {
  background: linear-gradient(to right, lobster-500, coral-600);
  -webkit-background-clip: text;
  color: transparent;
}
```

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--space-page` | 1rem | Page padding |
| `--space-section` | 4rem | Between sections |
| `--space-card` | 1.5rem | Card padding |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 0.375rem | Small elements |
| `--radius-md` | 0.5rem | Buttons, inputs |
| `--radius-lg` | 0.75rem | Cards |
| `--radius-xl` | 1rem | Large cards |
| `--radius-2xl` | 1.5rem | Hero sections |
| `--radius-full` | 9999px | Badges, avatars |

## Shadows

| Token | Usage |
|-------|-------|
| `--shadow-sm` | Subtle elevation |
| `--shadow-md` | Cards at rest |
| `--shadow-lg` | Cards on hover |
| `--shadow-xl` | Featured sections |

## Accessibility

### Contrast Requirements (WCAG AA)
- Normal text: 4.5:1 minimum ✅
- Large text (18px+ or 14px bold): 3:1 minimum ✅
- UI components: 3:1 minimum ✅

### Focus States
All interactive elements have visible focus indicators:
```css
*:focus-visible {
  outline: 2px solid var(--lobster-500);
  outline-offset: 2px;
}
```

### Skip Link
```jsx
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  /* Animations disabled */
}
```

### ARIA Labels
- Loading spinners have `role="status"` and `aria-label`
- Icons have `aria-hidden="true"` when decorative
- Form inputs have associated labels
- Toggle buttons use `aria-pressed`

## File Structure

```
app/
├── globals.css          # Design tokens + component classes
├── layout.tsx           # Root layout with fonts
├── page.tsx             # Homepage
├── marketplace/
├── post-task/
├── tasks/[id]/
├── auth/
│   ├── login/
│   └── signup/
└── dashboard/

components/
└── Navigation.tsx       # Shared nav component
```

## Usage Guidelines

### Do ✅
- Use `text-gray-900` for primary text on light backgrounds
- Use `text-gray-700` for secondary/body text
- Use `.card` class for content containers
- Use `.btn` classes for all buttons
- Use `.badge` classes for status indicators
- Add `aria-hidden="true"` to decorative icons

### Don't ❌
- Don't use `text-slate-*` (inconsistent with design system)
- Don't use raw color values; use CSS variables
- Don't create new button styles; extend existing classes
- Don't forget focus states on interactive elements
- Don't use low-contrast text colors
